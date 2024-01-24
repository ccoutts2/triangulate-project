import "./header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="nav">
        <ul className="nav__list">
          <div className="nav__left-side">
            <li className="nav__item">
              <Link className="nav__link" to={"/"}>
                TRIANGULATE
              </Link>
            </li>
          </div>

          <div className="nav__right-side">
            <li className="nav__item">
              <Link className="nav__link" to={"/about"}>
                ABOUT
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to={"/meet"}>
                MEET
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to={"/login"}>
                LOGIN
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
