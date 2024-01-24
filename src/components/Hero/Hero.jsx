import "./hero.scss";
import heroImage from "../../assets/images/hero.png";

const Hero = () => {
  return (
    <div className="hero">
      <img className="hero__image" src={heroImage}></img>
    </div>
  );
};

export default Hero;
