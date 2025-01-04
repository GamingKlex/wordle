import { Check, CircleHelp, Frown, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti-boom";

function App() {
  let [dialogOpen, setDialogOpen] = useState(false);

  let [lastWord, setLastWord] = useState("loading...");
  let [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    // Get the word of yesterday
    fetch("YESTERDAY").then((data) => {
      data.text().then((text) => {
        setLastWord(text);
      });
    });
  }, []);

  useEffect(() => {
    let started = new Date();
    function update() {
      let now = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0);
      tomorrow.setMinutes(0);
      tomorrow.setSeconds(0);
      let diff = Math.floor((tomorrow - now) / 1000);
      setTimeRemaining(formatTime(diff));

      // If the day has changed, reload the page
      if (
        now.getDate() !== started.getDate() ||
        now.getMonth() !== started.getMonth() ||
        now.getFullYear() !== started.getFullYear()
      ) {
        window.location.reload();
      }
    }
    update();
    let interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container">
        <div className="title">Wordle</div>
        <div className="subtitle">Guess todays word!</div>

        <button onClick={() => setDialogOpen(true)} className="howtoplay-btn">
          <CircleHelp size={18} />
          How to play
        </button>

        <Game />

        <div className="note">
          Yesterday's word was <span className="note-word">{lastWord}</span>{" "}
          <span style={{ margin: "0 0.5rem" }}>—</span> New word in{" "}
          {timeRemaining}!
        </div>
      </div>
      {dialogOpen && <HowToPlayDialog onClose={() => setDialogOpen(false)} />}
    </>
  );
}

function HowToPlayDialog({ onClose }) {
  return (
    <div className="dialog">
      <div className="dialog-window">
        <div className="dialog-header">
          <div className="dialog-title">
            <CircleHelp style={{ marginRight: "1rem" }} size={24} />
            How to play
          </div>
          <button className="dialog-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="dialog-text">
          Playing Wordle is very simple! <br />
          You have to guess a 5-letter word in 6 guesses.
          <br />
          <br />
          After each guess, the color of the letters will tell you how close you
          are to the correct word:
          <div className="preview-row">
            <div className="preview-col">
              <div className="preview-item right">U</div>
              <div className="preview-desc">
                Correct letter in the correct position
              </div>
            </div>
            <div className="preview-col">
              <div className="preview-item wrongpos">W</div>
              <div className="preview-desc">
                Correct letter in the wrong position
              </div>
            </div>
            <div className="preview-col">
              <div className="preview-item wrong">U</div>
              <div className="preview-desc">
                Word does not contain the letter
              </div>
            </div>
          </div>
          If you guess all the letters of the word correctly, you win!
          <br />
          <br />
          There may be duplicate letters in the word. <br />
          Valid letters are A-Z. There are no plurals. (e.g. "VERBS" can't be a
          word)
          <br />
          <br />
          Good luck!
        </div>
      </div>
    </div>
  );
}

function Game() {
  let [loading, setLoading] = useState(true);
  let [word, setWord] = useState("");
  let [rows, _setRows] = useState(
    JSON.parse(localStorage.getItem("wordle.rows")) || []
  );
  let [won, _setWon] = useState(localStorage.getItem("wordle.won") || false);

  // Save the rows in localstorage
  const setRows = (rows) => {
    _setRows(rows);
    localStorage.setItem("wordle.rows", JSON.stringify(rows));
    localStorage.setItem("wordle.saved", Date.now());
  };

  // Save the won state in localstorage
  const setWon = (won) => {
    _setWon(won);
    localStorage.setItem("wordle.won", won);
    localStorage.setItem("wordle.saved", Date.now());
  };

  useEffect(() => {
    // If we won on the old day, reset the game
    if (localStorage.getItem("wordle.saved")) {
      let saved = new Date(parseInt(localStorage.getItem("wordle.saved")));
      let now = new Date();
      if (now.getDate() !== saved.getDate()) {
        localStorage.removeItem("wordle.rows");
        localStorage.removeItem("wordle.won");
        localStorage.removeItem("wordle.saved");
        setRows([]);
        setWon(false);
      }
    } else localStorage.setItem("wordle.saved", Date.now());
  }, []);

  useEffect(() => {
    // Get the word of the day
    fetch("TODAY")
      .then((data) => {
        data
          .text()
          .then((text) => {
            setWord(text);
            setLoading(false);
          })
          .catch(() => {
            alert(
              "Failed to load the word of the day... Try refreshing the page!"
            );
          });
      })
      .catch(() => {
        alert("Failed to load the word of the day... Try refreshing the page!");
      });
  }, []);

  /**
   * @param {string[]} letters
   */
  const onSubmit = (letters) => {
    if (loading)
      return alert(
        "The word of the day has not loaded yet... Try refreshing the page!"
      );
    let newRow = [];
    letters.forEach((letter, i) => {
      if (letter === word[i]) {
        newRow.push({ value: letter, type: "right" });
      } else if (word.includes(letter)) {
        newRow.push({ value: letter, type: "wrongpos" });
      } else {
        newRow.push({ value: letter, type: "wrong" });
      }
    });

    if (letters.join("") === word) {
      setWon(true);
    }

    setRows([...rows, newRow]);
  };

  return (
    <>
      <div className="game-container">
        {rows.map((row, i) => (
          <GuessedRow key={i} letters={row} />
        ))}
        {rows.length < 6 && !won && <GuessingRow onSubmit={onSubmit} />}
        {rows.length < (won ? 6 : 5) &&
          new Array((won ? 6 : 5) - rows.length)
            .fill(0)
            .map((_, i) => <BlankRow key={i} />)}
      </div>
      {won && <Confetti mode="boom" particleCount={50} />}
      {won && (
        <div className="won-message">
          <Trophy />
          You won in {rows.length} guesses!
        </div>
      )}
      {rows.length === 6 && !won && (
        <div className="lost-message">
          <Frown />
          You lost! The word was {word}.
        </div>
      )}
    </>
  );
}

function GuessedRow({ letters }) {
  return (
    <div className="row">
      {letters.map((letter, i) => (
        <div key={i} className={"guessed-letter " + letter.type}>
          {letter.value}
        </div>
      ))}
    </div>
  );
}

function GuessingRow({ onSubmit }) {
  let [letters, setLetters] = useState(["", "", "", "", ""]);

  /**
   * @param {number} index
   * @param {string} value
   */
  const setLetter = (index, value) => {
    let letter = value.toUpperCase().slice(-1);
    if (!/^[A-Z]$/.test(letter)) return;
    let newLetters = [...letters];
    newLetters[index] = letter;
    setLetters(newLetters);

    if (value.length > 0 && index < 4) {
      let nextInput = document.getElementById(`guess${index + 1}`);
      nextInput.focus();
    }
  };

  useEffect(() => {
    if (letters.join("").length !== 5) return;
    function onKeyDown(e) {
      if (e.key === "Enter") {
        onSubmit(letters);
        setLetters(["", "", "", "", ""]);
        let input = document.getElementById(`guess0`);
        if (input) input.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydonw", onKeyDown);
  }, [letters, onSubmit]);

  return (
    <div className="row">
      <div className="guessing-letter">
        <input
          autoComplete="off"
          autoFocus
          value={letters[0]}
          onChange={(e) => setLetter(0, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess0"
        />
      </div>
      <div className="guessing-letter">
        <input
          autoComplete="off"
          value={letters[1]}
          onChange={(e) => setLetter(1, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess1"
        />
      </div>
      <div className="guessing-letter">
        <input
          autoComplete="off"
          value={letters[2]}
          onChange={(e) => setLetter(2, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess2"
        />
      </div>
      <div className="guessing-letter">
        <input
          autoComplete="off"
          value={letters[3]}
          onChange={(e) => setLetter(3, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess3"
        />
      </div>
      <div className="guessing-letter">
        <input
          autoComplete="off"
          value={letters[4]}
          onChange={(e) => setLetter(4, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess4"
        />
      </div>
      {letters.join("").length === 5 && (
        <div className="enter-hint">
          <button
            onClick={() => {
              onSubmit(letters);
              setLetters(["", "", "", "", ""]);
              let input = document.getElementById(`guess0`);
              if (input) input.focus();
            }}
            className="enter-button"
          >
            <Check style={{ flexShrink: 0 }} size={20} />
            <div className="original">Press ENTER to submit!</div>
            <div className="hidden">or just click here...</div>
          </button>
        </div>
      )}
    </div>
  );
}

function BlankRow() {
  return (
    <div className="row">
      <div className="blank-letter"></div>
      <div className="blank-letter"></div>
      <div className="blank-letter"></div>
      <div className="blank-letter"></div>
      <div className="blank-letter"></div>
    </div>
  );
}

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;
  let formatted = "";
  if (hours > 0) formatted += hours + " hrs, ";
  if (minutes > 0) formatted += minutes + " mins and ";
  formatted += seconds + " secs";
  return formatted;
}

export default App;
