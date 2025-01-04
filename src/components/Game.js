import { Frown, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti-boom";
import BlankRow from "./BlankRow";
import GuessedRow from "./GuessedRow";
import GuessingRow from "./GuessingRow";

export default function Game() {
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
    localStorage.setItem("wordle.todaysWord", btoa(word));
  };

  // Save the won state in localstorage
  const setWon = (won) => {
    _setWon(won);
    localStorage.setItem("wordle.won", won);
    localStorage.setItem("wordle.todaysWord", btoa(word));
  };

  useEffect(() => {
    if (!word) return;
    // If we won on the old word, reset the game
    if (localStorage.getItem("wordle.todaysWord")) {
      if (atob(localStorage.getItem("wordle.todaysWord")) !== word) {
        localStorage.removeItem("wordle.rows");
        localStorage.removeItem("wordle.won");
        localStorage.removeItem("wordle.todaysWord");
        _setRows([]);
        _setWon(false);
      }
    } else localStorage.setItem("wordle.todaysWord", btoa(word));
  }, [word]);

  useEffect(() => {
    // Get the word of the day
    setLoading(true);
    fetch("/wordle/TODAY", {
      cache: "no-store",
    })
      .then((data) => {
        data
          .text()
          .then((text) => {
            setWord(text.toUpperCase().trim());
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
