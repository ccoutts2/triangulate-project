import "./login.scss";
import Input from "../../components/Input/Input";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

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

      navigate("/meet");
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <main className="login-page">
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <Input type="text" name="user_name" label="User name" />
        <Input type="password" name="password" label="Password" />
        <button className="login__button">Log in</button>
        {error && <div className="login__message">{error}</div>}
      </form>
      <p>
        Need an account? <Link to="/signup">Sign up</Link>
      </p>
    </main>
  );
}

export default Login;
