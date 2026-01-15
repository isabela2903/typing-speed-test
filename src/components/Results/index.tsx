import "./Results.css"

interface ResultsProps {
  accuracy: number;
  wpm: number;
  correctChars: number;
  incorrectChars: number;
  isFinished: boolean;
  resetHandleClick: () => void;
  resultMessage: string;
  shouldShowConfetti: boolean;
}

const getResultDescription = (resultMessage: string) => {
  if (resultMessage === "Test Complete!") {
    return "Solid run. Keep pushing to beat your high score.";
  }
  if (resultMessage === "Baseline Estabilished!") {
    return "You've set the bar. Now the real challenge begins - time to beat it.";
  }
  if (resultMessage === "High Score Smashed!") {
    return "You're getting faster. That was incredible typing.";
  }
  return null;
};

const getAccuracyClass = (accuracy: number) =>
  `${accuracy === 100 ? "value-green" : "value-red"}`;

const getButtonLabel = (resultMessage: string) =>
  resultMessage === "Test Complete!" ? "Go Again" : "Beat This Score";

const isHighScore = (resultMessage: string) =>
  resultMessage === "High Score Smashed!";

export const Results = ({
  accuracy,
  wpm,
  correctChars,
  incorrectChars,
  isFinished,
  resetHandleClick,
  resultMessage,
  shouldShowConfetti,
}: ResultsProps) => {
  if (!isFinished) return null;

  const description = getResultDescription(resultMessage);
  const highScore = isHighScore(resultMessage);

  return (
    <section className="results">
      {highScore ? (
        <img src="./images/icon-new-pb.svg" className="results-icon" alt="New personal best" />
      ) : (
        <div className="results-badge">
          <div className="circle-outer">
            <div className="circle-inner">
              <img
                src="./images/icon-completed.svg"
                className="results-icon"
                alt="Completed"
              />
            </div>
          </div>
        </div>
      )}

      <p className="results-title">
        {resultMessage}
      </p>
      {description && <p>{description}</p>}

      <div className="results-stats">
        <div className="result-box">
          <p className="stat-label">WPM:</p>
          <p className="stat-value wpm">{wpm.toFixed(0)}</p>
        </div>

        <div className="result-box">
          <p className="stat-label">Accuracy:</p>
          <p className={`${getAccuracyClass(accuracy)} stat-value`}>
            {accuracy.toFixed(0)}%
          </p>
        </div>

        <div className="result-box">
          <p className="stat-label">Characters</p>
          <p className="stat-value">
            <span className="value-green">{correctChars}</span>/
            <span className="value-red">{incorrectChars}</span>
          </p>
        </div>
      </div>

      <button
        className="go-again-btn"
        onClick={resetHandleClick}
      >
        {getButtonLabel(resultMessage)}
        <img
          src="./images/go-again-icon.svg"
          className="go-again-btn-icon"
        />
      </button>

      {highScore ? (
        shouldShowConfetti && (
          <div className="results-confetti">
            <img
              src="./images/pattern-confetti.svg"
              className="confetti-image"
              alt="confetti"
            />
          </div>
        )
      ) : (
        <>
          <img
            src="./images/pattern-star-1.svg"
            className="star-right"
          />
          <img
            src="./images/pattern-star-2.svg"
            className="star-left"
          />
        </>
      )}
    </section>
  );
};
