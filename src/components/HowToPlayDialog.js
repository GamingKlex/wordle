import { CircleHelp, X } from "lucide-react";

export default function HowToPlayDialog({ onClose }) {
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
          Each guess must be a 5-letter word. (if it shakes, it isn't valid)
          <br />
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
