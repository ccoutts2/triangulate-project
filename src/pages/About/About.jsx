import "./about.scss";
import drinkIcon from "../../assets/icons/drink_light.svg";
import navigateIcon from "../../assets/icons/navigate-icon.svg";
import friendsIcon from "../../assets/icons/friends-icon.svg";

const About = () => {
  return (
    <main className="about-page">
      <section className="about-page__text-section">
        <div className="about-page__container">
          <h2 className="about-page__header">Problem</h2>
          <p className="about-page__text">
            In a large city it can sometimes be a difficult decision to find the best
            place to visit with friends scattered all over. Convenient planning and
            data visualisation makes life easier
          </p>
        </div>
        <div className="about-page__container">
          <h2 className="about-page__header">Solution</h2>
          <p className="about-page__text">
            Triangulate will connect to you and your friends and help you choose a
            the best location to meet your friends
          </p>
        </div>
        <div className="about-page__container">
          <h2 className="about-page__header">Technology</h2>
          <p className="about-page__text">
            Triangulate uses MapBox's API for Geocoding applications
          </p>
        </div>
      </section>
      <section className="about-page__box-section">
        <div className="about-page__red-box">
          <img className="home-page__icon" src={navigateIcon} />
        </div>
        <div className="about-page__red-box">
          <img className="home-page__icon" src={friendsIcon} />
        </div>
        <div className="about-page__red-box">
          <img className="home-page__icon" src={drinkIcon} />
        </div>
      </section>
    </main>
  );
};

export default About;
