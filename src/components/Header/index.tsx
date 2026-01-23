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
        <p className="personal-best-text small">Recorde: <span className="personal-best-value">{personalBest.toFixed(0)} PPM</span></p>
        <p className="personal-best-text large">Recorde pessoal: <span className="personal-best-value">{personalBest.toFixed(0)} PPM</span></p>
      </div>
    </header>
  );
};
