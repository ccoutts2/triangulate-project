import "./home.scss";
import Hero from "../../components/Hero/Hero";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import drinkIcon from "../../assets/icons/drink_light.svg";
import navigateIcon from "../../assets/icons/navigate-icon.svg";
import friendsIcon from "../../assets/icons/friends-icon.svg";

const Home = () => {
  const navigate = useNavigate();
  const onClickSignUp = () => {
    navigate("/signup");
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  return (
    <main className="home-page">
      <Hero />
      <section className="home-page__red-boxes">
        <div className="home-page__boxes-col-1">
          <div className="home-page__box-1">
            <img className="home-page__icon" src={navigateIcon} />
          </div>
          <div className="home-page__box-2">
            <img className="home-page__icon" src={friendsIcon} />
          </div>
        </div>
        <div className="home-page__boxes-col-2">
          <div className="home-page__box-3">
            <img className="home-page__icon" src={drinkIcon} />
          </div>
        </div>
      </section>
      <section className="home-page__bio-section">
        <div className="home-page__bio">
          Want to meet all your friends at the pub but don't know where to go? Let
          Triangulate give you a helping hand
        </div>
      </section>
      <div className="home-page__button-container">
        <Button className="home-page__button" label="Login" onClick={onClickLogin} />
        <Button
          className="home-page__button"
          label="Sign Up"
          onClick={onClickSignUp}
        />
      </div>
    </main>
  );
};

export default Home;
