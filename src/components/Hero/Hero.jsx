import "./hero.scss";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <div className="hero">
      <TypeAnimation
        sequence={[
          "Meet your friends",
          1000,
          "Find the best pubs",
          1000,
          "Enjoy with friends",
          2000,
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: "2rem", display: "inline-block" }}
      />
    </div>
  );
};

export default Hero;
