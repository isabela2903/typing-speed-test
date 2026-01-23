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
  if (resultMessage === "Teste Concluído!") {
    return "Bela rodada. Continue treinando para bater seu recorde.";
  }
  if (resultMessage === "Ponto de partida definido!") {
    return "Marca estabelecida. O desafio começou — supere seu tempo.";
  }
  if (resultMessage === "Recorde Superado!") {
    return "Você está cada vez mais rápido. Mandou muito bem!";
  }
  return null;
};

const getAccuracyClass = (accuracy: number) =>
  `${accuracy === 100 ? "value-green" : "value-red"}`;

const getButtonLabel = (resultMessage: string) =>
  resultMessage === "Teste Concluído!" ? "Jogar novamente" : "Bata este recorde";

const isHighScore = (resultMessage: string) =>
  resultMessage === "Recorde Superado!";

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
      {description && <p className="results-description">{description}</p>}

      <div className="results-stats">
        <div className="result-box">
          <p className="stat-label">PPM:</p>
          <p className="stat-value wpm">{wpm.toFixed(0)}</p>
        </div>

        <div className="result-box">
          <p className="stat-label">Precisão:</p>
          <p className={`${getAccuracyClass(accuracy)} stat-value`}>
            {accuracy.toFixed(0)}%
          </p>
        </div>

        <div className="result-box">
          <p className="stat-label">Caracteres</p>
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
