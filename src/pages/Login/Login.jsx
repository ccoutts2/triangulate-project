import "./login.scss";
import Input from "../../components/Input/Input";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Button from "../../components/Button/Button";

function Login() {
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/users/login`, {
        user_name: event.target.user_name.value,
        password: event.target.password.value,
      });

      sessionStorage.setItem("token", response.data.token);

      navigate("/profile");
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <main className="login-page">
      <section className="login-page__welcome">
        <h1 className="login-page__header">Welcome to Triangulate</h1>
      </section>
      <form className="login-page__form" onSubmit={handleSubmit}>
        <Input
          className="login-page__input"
          type="text"
          name="user_name"
          label="Enter your user name"
        />
        <Input
          className="login-page__input"
          type="password"
          name="password"
          label="Enter your password"
        />
        <Button className="login-page__button" label="Login" />
        {error && <div className="login-page__message">{error}</div>}
      </form>
      <section className="login-page__foot-note">
        <p>
          Don't have an account?{" "}
          <Link className="login-page__link" to="/signup">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
