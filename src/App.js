import { Check, CircleHelp, X } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  let [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <div className="container">
        <div className="title">Wordle</div>
        <div className="subtitle">Guess todays word!</div>

        <button onClick={() => setDialogOpen(true)} className="howtoplay-btn">
          <CircleHelp size={18} />
          How to play
        </button>

        <div className="game-container">
          <GuessedRow
            letters={[
              { value: "A", type: "right" },
              { value: "B", type: "wrong" },
              { value: "C", type: "wrongpos" },
              { value: "D", type: "right" },
              { value: "E", type: "wrong" },
            ]}
          />
          <GuessingRow />
          <BlankRow />
          <BlankRow />
          <BlankRow />
          <BlankRow />
        </div>

        <div className="note">
          Yesterday's word was <span className="note-word">APPLE</span>{" "}
          <span style={{ margin: "0 0.5rem" }}>—</span> New word in 3 min. and
          20 seconds!
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quicquid enim
          a sapientia proficiscitur, id continuo debet expletum esse omnibus
          suis partibus; Magna laus. Qua igitur re ab deo vincitur, si
          aeternitate non vincitur? Collatio igitur ista te nihil iuvat. At ego
          quem huic anteponam non audeo dicere; Est enim effectrix multarum et
          magnarum voluptatum. Duo Reges: constructio interrete. Nulla profecto
          est, quin suam vim retineat a primo ad extremum.
        </div>
      </div>
    </div>
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
    let newLetters = [...letters];
    newLetters[index] = value.toUpperCase().slice(-1);
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
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydonw", onKeyDown);
  }, [letters, onSubmit]);

  return (
    <div className="row">
      <div className="guessing-letter">
        <input
          autoFocus
          value={letters[0]}
          onChange={(e) => setLetter(0, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess0"
        />
      </div>
      <div className="guessing-letter">
        <input
          value={letters[1]}
          onChange={(e) => setLetter(1, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess1"
        />
      </div>
      <div className="guessing-letter">
        <input
          value={letters[2]}
          onChange={(e) => setLetter(2, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess2"
        />
      </div>
      <div className="guessing-letter">
        <input
          value={letters[3]}
          onChange={(e) => setLetter(3, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess3"
        />
      </div>
      <div className="guessing-letter">
        <input
          value={letters[4]}
          onChange={(e) => setLetter(4, e.target.value)}
          onFocus={(e) => e.target.select()}
          id="guess4"
        />
      </div>
      {letters.join("").length === 5 && (
        <div className="enter-hint">
          <button className="enter-button">
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

export default App;
