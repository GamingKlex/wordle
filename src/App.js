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

export default App;
