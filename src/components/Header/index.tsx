import "./Header.css"

interface HeaderProps {
  personalBest: number;
}

export const Header = ({personalBest}: HeaderProps) => {
  return (
    <header className="header">
      <img src="./images/logo-small.svg" alt="Logo" className="logo small"/>
      <img src="./images/logo-large.svg" alt="Logo" className="logo large"/>

      <div className="personal-best">
        <img src="./images/icon-personal-best.svg" className="personal-best-icon" />
        <p className="personal-best-text small">Best: <span className="personal-best-value">{personalBest.toFixed(0)} WPM</span></p>
        <p className="personal-best-text large">Personal best: <span className="personal-best-value">{personalBest.toFixed(0)} WPM</span></p>
      </div>
    </header>
  );
};
