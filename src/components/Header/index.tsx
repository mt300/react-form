import logoImg from '../../assets/images/logo.png';

import "./styles.css";

export function Header() {
  return (
    <div className="header-container">
      <div className="header-brand">
        <img src={logoImg} alt="" />
      </div>
    </div>
  )
}