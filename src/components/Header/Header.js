import "./header.scss";
import { slide as Menu } from "react-burger-menu";

const Header = () => {
  return (
    <header>
      <nav className="nav">
        <ul className="nav__list">
          <div className="nav__left-side">
            <li className="nav__item">
              <a className="nav__link" href={"#"}>
                TRIANGULATE
              </a>
            </li>
          </div>
          <div className="nav__right-side">
            <li className="nav__item">
              <a className="nav__link" href={"#"}>
                ABOUT
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href={"#"}>
                MEET
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href={"#"}>
                LOGIN
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
