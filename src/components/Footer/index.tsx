import "./Footer.css"

interface FooterProps {
  hasStarted: boolean;
  resetHandleClick: () => void;
  isFinished: boolean;
}

export const Footer = ({ hasStarted, resetHandleClick, isFinished }: FooterProps) => {
  if (!hasStarted || isFinished) return null;

  return (
    <footer className="footer">
      <button className="restart-btn" onClick={resetHandleClick}>
        Reiniciar Teste
        <img src="./images/icon-restart.svg" className="restart-icon" alt="Restart icon" />
      </button>
    </footer>
  );
};
