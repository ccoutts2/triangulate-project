import "./home.scss";
import Hero from "../../components/Hero/Hero";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/signup");
  };

  return (
    <main className="home-page">
      <Hero />
      <section className="home-page__red-boxes">
        <div className="home-page__boxes-col-1">
          <div className="home-page__box-1"></div>
          <div className="home-page__box-2"></div>
        </div>
        <div className="home-page__boxes-col-2">
          <div className="home-page__box-3"></div>
        </div>
      </section>
      <div className="home-page__button-container">
        <Button className="home-page__button" label="Login" />
        <Button className="home-page__button" label="Sign Up" onClick={onClick} />
      </div>
    </main>
  );
};

export default Home;
