import "./StatusBar.css";

interface HeaderProps {
  difficulty: "easy" | "medium" | "hard";
  setDifficulty: (difficult: "easy" | "medium" | "hard") => void;
  mode: "timed" | "passage";
  setMode: (mode: "timed" | "passage") => void;
  timeElapsed: number;
  accuracy: number;
  wpm: number;
  isFinished: boolean;
  hasStarted: boolean;
  difficultyOpen: boolean;
  setDifficultyOpen: (difficultyOpen: boolean) => void;
  modeOpen: boolean;
  setModeOpen: (modeOpen: boolean) => void;
}

export const StatusBar = ({
  difficulty,
  setDifficulty,
  mode,
  setMode,
  timeElapsed,
  accuracy,
  wpm,
  isFinished,
  hasStarted,
  difficultyOpen,
  setDifficultyOpen,
  modeOpen,
  setModeOpen,
}: HeaderProps) => {
  const timeLeft =
    mode === "timed" ? Math.max(30 - timeElapsed, 0) : timeElapsed;
  function formatTime() {
    const m = Math.floor(timeLeft / 60);
    const s = Math.floor(timeLeft % 60);

    return `${m}:${String(s).padStart(2, "0")}`;
  }

  if (isFinished) return null;

  const difficultyLabel =
    difficulty === "easy"
      ? "Easy"
      : difficulty === "medium"
      ? "Medium"
      : "Hard";

  const modeLabel = mode === "timed" ? "Timed (30s)" : "Passage";

  return (
    <section className="status-bar">
      <div className="metrics">
        <p>
          WPM: <span className="metric-value base">{wpm.toFixed(0)}</span>
        </p>
        <p className="metric-with-border">
          Accuracy:{" "}
          <span className={`metric-value ${hasStarted ? "accuracy" : "base"}`}>
            {accuracy.toFixed(0)}%
          </span>
        </p>
        <p>
          Time:{" "}
          <span className={`metric-value ${hasStarted ? "time" : "base"}`}>
            {formatTime()}
          </span>
        </p>
      </div>

      <div className="controls small">
        <div className="dropdown-wrapper">
          <button
            className="dropdown-trigger"
            onClick={() => {
              setDifficultyOpen(!difficultyOpen);
              setModeOpen(false);
            }}
          >
            {difficultyLabel}
            <span className="dropdown-caret"><img src="./images/icon-down-arrow.svg" /></span>
          </button>

          {difficultyOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => {
                  setDifficulty("easy");
                  setDifficultyOpen(false);
                }}
              >
                <span
                  className={`radio ${difficulty === "easy" ? "checked" : ""}`}
                />
                <span>Easy</span>
              </button>
              <button
                className="dropdown-item with-border"
                onClick={() => {
                  setDifficulty("medium");
                  setDifficultyOpen(false);
                }}
              >
                <span
                  className={`radio ${
                    difficulty === "medium" ? "checked" : ""
                  }`}
                />
                <span>Medium</span>
              </button>
              <button
                className="dropdown-item with-border"
                onClick={() => {
                  setDifficulty("hard");
                  setDifficultyOpen(false);
                }}
              >
                <span
                  className={`radio ${difficulty === "hard" ? "checked" : ""}`}
                />
                <span>Hard</span>
              </button>
            </div>
          )}
        </div>

        <div className="dropdown-wrapper">
          <button
            className="dropdown-trigger"
            onClick={() => {
              setModeOpen(!modeOpen);
              setDifficultyOpen(false);
            }}
          >
            {modeLabel}
            <span className="dropdown-caret"><img src="./images/icon-down-arrow.svg" /></span>
          </button>

          {modeOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => {
                  setMode("timed");
                  setModeOpen(false);
                }}
              >
                <span
                  className={`radio ${mode === "timed" ? "checked" : ""}`}
                />
                <span>Timed (30s)</span>
              </button>
              <button
                className="dropdown-item with-border"
                onClick={() => {
                  setMode("passage");
                  setModeOpen(false);
                }}
              >
                <span
                  className={`radio ${mode === "passage" ? "checked" : ""}`}
                />
                <span>Passage</span>
              </button>
            </div>
          )}
        </div>
      </div>

       <div className="controls large">
        <div className="difficulty-group">
          <p className="label">Difficult:</p>


          <button
            className={`btn ${difficulty === "easy" ? "selected" : ""}`}
            onClick={() => setDifficulty("easy")}
          >
            Easy
          </button>
          <button
            className={`btn ${difficulty === "medium" ? "selected" : ""}`}
            onClick={() => setDifficulty("medium")}
          >
            Medium
          </button>
          <button
            className={`btn ${difficulty === "hard" ? "selected" : ""}`}
            onClick={() => setDifficulty("hard")}
          >
            Hard
          </button>
        </div>


        <div className="mode-group">
          <p className="label">Mode:</p>
          <button
            className={`btn ${mode === "timed" ? "selected" : ""}`}
            onClick={() => setMode("timed")}
          >
            Timed (30s)
          </button>
          <button
            className={`btn ${mode === "passage" ? "selected" : ""}`}
            onClick={() => setMode("passage")}
          >
            Passage
          </button>
        </div>
      </div>
    </section>
  );
};
