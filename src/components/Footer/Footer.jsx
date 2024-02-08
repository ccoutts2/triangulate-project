import "./footer.scss";
import { Link } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import { BsFillPinMapFill } from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";

const Footer = () => {
  return (
    <footer>
      <nav className="footer-nav">
        <ul className="footer-nav__list">
          <li className="footer-nav__item">
            <Link to="/" className="footer-nav__link">
              <div className="footer-nav__icon-container">
                <MdOutlineRateReview />
                Add Rating
              </div>
            </Link>
          </li>
          <li className="footer-nav__item">
            <Link to="/" className="footer-nav__link">
              <div className="footer-nav__icon-container">
                <BsFillPinMapFill />
                Meet
              </div>
            </Link>
          </li>
          <li className="footer-nav__item">
            <Link to="/groups" className="footer-nav__link">
              <div className="footer-nav__icon-container">
                <GrGroup />
                Groups
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
