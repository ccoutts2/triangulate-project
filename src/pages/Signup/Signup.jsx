import "./signup.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/Input/Input";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${baseURL}/api/users/signup`, {
        user_name: event.target.user_name.value,
        email: event.target.email.value,
        address: event.target.address.value,
        password: event.target.password.value,
      });
      navigate("/login");
    } catch (error) {
      event.target.reset();
      setError(error.response.data);
    }
  };

  return (
    <main className="signup-page">
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign up</h1>
        <Input type="text" name="user_name" label="User name" />
        <Input type="text" name="address" label="Address" />
        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <button className="signup__button">Sign up</button>
        <p>{error}</p>
      </form>
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
};

export default Signup;
