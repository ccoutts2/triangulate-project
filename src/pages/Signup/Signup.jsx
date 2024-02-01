import "./signup.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

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
      <section className="signup-page__welcome">
        <h1 className="login-page__header">Sign Up to Triangulate</h1>
      </section>
      <form className="signup-page__form" onSubmit={handleSubmit}>
        <Input
          className="signup-page__input"
          type="text"
          name="user_name"
          label="User Name"
        />
        <Input
          className="signup-page__input"
          type="text"
          name="address"
          label="Address"
        />
        <Input
          className="signup-page__input"
          type="text"
          name="email"
          label="Email"
        />
        <Input
          className="signup-page__input"
          type="password"
          name="password"
          label="Password"
        />
        <Button className="signup-page__button" label="Sign Up" />
        <p>{error}</p>
      </form>
      <section className="signup-page__foot-note">
        <p>
          Don't have an account?{" "}
          <Link className="signup-page__link" to="/login">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Signup;
