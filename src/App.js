import { CircleHelp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { formatTime } from "./utils/formatTime";
import Game from "./components/Game";
import HowToPlayDialog from "./components/HowToPlayDialog";

function App() {
  let [dialogOpen, setDialogOpen] = useState(false);

  let [lastWord, setLastWord] = useState("loading...");
  let [timeRemaining, setTimeRemaining] = useState("");

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get the word of yesterday
    fetch("/wordle/YESTERDAY", {
      cache: "no-store",
    }).then((data) => {
      data.text().then((text) => {
        setLastWord(text);
      });
    });
  }, []);

  useEffect(() => {
    let started = new Date();
    function update() {
      let now = new Date();
      let tomorrow = new Date(now);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      tomorrow.setUTCHours(0, 0, 0, 0);
      let diff = Math.floor((tomorrow - now) / 1000);
      if (diff < 0) diff = 0;
      setTimeRemaining(formatTime(diff));

      // If diff is between 24 hours and 23 hours and 59 minutes, display loading and reload the page
      if (diff < 86400 && diff > 86340) {
        setLoading(true);
        setTimeout(() => {
          window.location.reload();
        }, 60 * 1000);
      }

      // If the day has changed, reload the page
      if (
        now.getUTCDate() !== started.getUTCDate() ||
        now.getUTCMonth() !== started.getUTCMonth() ||
        now.getUTCFullYear() !== started.getUTCFullYear()
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

        {loading ? (
          <>
            <Loader2 className="loader" />
            <div className="loader-text">
              Today's wordle is loading... Check back in a minute!
            </div>
          </>
        ) : (
          <Game />
        )}

        <div className="note">
          Yesterday's word was <span className="note-word">{lastWord}</span>{" "}
          <span style={{ margin: "0 0.5rem" }}>—</span> New word in{" "}
          {timeRemaining}!
        </div>
        <a
          className="github-link"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/GamingKlex/wordle"
        >
          View on GitHub
        </a>
      </div>
      {dialogOpen && <HowToPlayDialog onClose={() => setDialogOpen(false)} />}
    </>
  );
}

export default App;
