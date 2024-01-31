import "./hero.scss";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <div className="hero">
      <TypeAnimation
        sequence={[
          "Meet your friends", // Types 'One'
          1000, // Waits 1s
          "Find the best pubs...", // Deletes 'One' and types 'Two'
          2000, // Waits 2s
          "Find the best pubs... and enjoy with friends",
          2000, // Types 'Three' without deleting 'Two'
          () => {
            console.log("Sequence completed");
          },
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
