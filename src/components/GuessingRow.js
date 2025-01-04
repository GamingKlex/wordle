import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import isInWordlist from "../utils/isInWordlist";
import shake from "../utils/shake";

export default function GuessingRow({ onSubmit }) {
  let [letters, setLetters] = useState(["", "", "", "", ""]);

  const row = useRef(null);

  /**
   * @param {number} index
   * @param {string} value
   */
  const setLetter = (index, value) => {
    let letter = value.toUpperCase().slice(-1);
    if (!/^([A-Z]|)$/.test(letter)) return;
    let newLetters = [...letters];
    newLetters[index] = letter;
    setLetters(newLetters);

    if (value.length > 0 && index < 4) {
      let nextInput = document.getElementById(`guess${index + 1}`);
      nextInput.focus();
    }
  };

  const goBack = (currentIndex) => {
    if (currentIndex === 0) return;
    let prevInput = document.getElementById(`guess${currentIndex - 1}`);
    prevInput.focus();
  };

  useEffect(() => {
    if (letters.join("").length !== 5) return;
    async function onKeyDown(e) {
      if (e.key === "Enter") {
        if (await isInWordlist(letters.join(""))) {
          onSubmit(letters);
          setLetters(["", "", "", "", ""]);
          let input = document.getElementById(`guess0`);
          if (input) input.focus();
        } else {
          shake(row.current);
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydonw", onKeyDown);
  }, [letters, onSubmit]);

  return (
    <div className="row" ref={row}>
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
          onKeyDown={(e) =>
            e.key === "Backspace" && !e.target.value && goBack(1)
          }
          onFocus={(e) => e.target.select()}
          id="guess1"
        />
      </div>
      <div className="guessing-letter">
        <input
          autoComplete="off"
          value={letters[2]}
          onChange={(e) => setLetter(2, e.target.value)}
          onKeyDown={(e) =>
            e.key === "Backspace" && !e.target.value && goBack(2)
          }
          onFocus={(e) => e.target.select()}
          id="guess2"
        />
      </div>
      <div className="guessing-letter">
        <input
          autoComplete="off"
          value={letters[3]}
          onChange={(e) => setLetter(3, e.target.value)}
          onKeyDown={(e) =>
            e.key === "Backspace" && !e.target.value && goBack(3)
          }
          onFocus={(e) => e.target.select()}
          id="guess3"
        />
      </div>
      <div className="guessing-letter">
        <input
          autoComplete="off"
          value={letters[4]}
          onChange={(e) => setLetter(4, e.target.value)}
          onKeyDown={(e) =>
            e.key === "Backspace" && !e.target.value && goBack(4)
          }
          onFocus={(e) => e.target.select()}
          id="guess4"
        />
      </div>
      {letters.join("").length === 5 && (
        <div className="enter-hint">
          <button
            onClick={async () => {
              if (await isInWordlist(letters.join(""))) {
                onSubmit(letters);
                setLetters(["", "", "", "", ""]);
                let input = document.getElementById(`guess0`);
                if (input) input.focus();
              } else shake(row.current);
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
