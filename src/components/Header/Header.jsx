import "./header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/triangulate-logo.svg";

const Header = () => {
  return (
    <header>
      <nav className="nav">
        <ul className="nav__list">
          <div className="nav__left-side">
            <li className="nav__item">
              <Link className="nav__link" to={"/"}>
                <img
                  src={logo}
                  className="nav__logo"
                  alt="triangle with triangulate text"
                />
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
              <Link className="nav__link" to={"/add-pub"}>
                ADD PUB
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
