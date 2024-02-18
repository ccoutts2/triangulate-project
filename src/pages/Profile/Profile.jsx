import "./profile.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { CiLogout } from "react-icons/ci";

const Profile = () => {
  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [groupUsers, setGroupUsers] = useState(null);

  const loadProfile = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    try {
      const { data } = await axios.get(`${baseURL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
      setFailedAuth(true);
    }
  };

  const fetchUsers = async (userId) => {
    try {
      const { data } = await axios.get(`${baseURL}/users/groups/${userId}`);
      setGroupUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    fetchUsers(userId);
  }, [userId]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <main className="profile-page__login">
        <p className="profile-page__login">
          You must be logged in to see this page.
        </p>
        <p className="profile-page__login">
          <Link className="profile-page__link" to="/login">
            Log in
          </Link>
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="Profile">
        <p>Retrieving Profile...</p>
      </main>
    );
  }

  if (!groupUsers) {
    return null;
  }
  return (
    <main className="profile-page">
      <h1 className="profile-page__header">Profile</h1>
      <p className="profile-page__text">Why hello, {user.user_name}</p>
      <p className="profile-page__text">
        Here's your favourite drink: {user.favourite_drink}
      </p>
      <p className="profile-page__text">You are in</p>
      <Button
        className="profile-page__signout-button"
        label={<CiLogout />}
        onClick={handleLogout}
      />
    </main>
  );
};

export default Profile;
