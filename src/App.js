import { CircleHelp, X } from "lucide-react";
import { useState } from "react";

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
      {dialogOpen && <Dialog onClose={() => setDialogOpen(false)} />}
    </>
  );
}

function Dialog({ onClose }) {
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

function GuessingRow() {
  return (
    <div className="row">
      <div className="guessing-letter">
        <input />
      </div>
      <div className="guessing-letter">
        <input />
      </div>
      <div className="guessing-letter">
        <input />
      </div>
      <div className="guessing-letter">
        <input />
      </div>
      <div className="guessing-letter">
        <input />
      </div>
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
