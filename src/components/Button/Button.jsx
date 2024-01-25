import "./button.scss";

const Button = ({ className, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`button${className ? ` ${className}` : ""}`}>
      {label}
    </button>
  );
};

export default Button;
