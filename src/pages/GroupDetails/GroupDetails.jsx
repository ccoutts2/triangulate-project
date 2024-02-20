import "./group-details.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Button from "../../components/Button/Button";
import hero from "../../assets/images/hero.svg";

const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  const [groupDetails, setGroupDetails] = useState(null);
  const [groupPubs, setGroupPubs] = useState(null);
  const [groupUsers, setGroupUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  const fetchDetails = async (groupId) => {
    try {
      const { data } = await axios.get(`${baseURL}/groups/${groupId}`);
      setGroupDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPubs = async (groupId) => {
    try {
      const { data } = await axios.get(`${baseURL}/meet/${groupId}/pubs`);
      setGroupPubs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async (groupId) => {
    try {
      const { data } = await axios.get(`${baseURL}/users/${groupId}`);
      setGroupUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const joinGroup = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    try {
      const { data } = await axios.post(
        `${baseURL}/groups/${groupId}/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(data);
    } catch (error) {
      console.log(error);
      setFailedAuth(true);
    }
  };

  useEffect(() => {
    fetchDetails(groupId);
  }, []);

  useEffect(() => {
    fetchPubs(groupId);
  });

  useEffect(() => {
    fetchUsers(groupId);
  });

  if (!groupDetails || !groupPubs || !groupUsers) {
    return null;
  }

  const personalMessage = () => {
    const placesCount = groupPubs.features.length;

    if (placesCount === 0) {
      return "Start your journey now!";
    } else if (placesCount === 1) {
      return "Your journey has begun";
    } else if (placesCount >= 10 && placesCount < 30) {
      return "Great mapping! You're getting the hang of this";
    } else if (placesCount > 30) {
      return "You know your city well!";
    }
  };

  const message = personalMessage();

  return (
    <main className="group-details">
      <Link to="/groups" className="group-details__icon">
        <IoArrowBackCircleOutline />
      </Link>{" "}
      <h2 className="group-details__header">Back to Groups</h2>
      <Link to={`/meet/${groupId}/pubs`} className="group-details__header">
        <img
          className="group-details__image"
          src={hero}
          alt="picture of map of the UK"
        />
      </Link>
      <div className="group-details__info">
        <p className="group-details__text">You are viewing:</p>
        <h1 className="group-details__h1">{groupDetails.group_name}</h1>
        <p className="group-details__text">Pubs: {groupPubs.features.length}</p>
        <p className="group-details__text">Users: {groupUsers.length}</p>
        <p className="group-details__text">{message}</p>
        <div className="group-details__button-container">
          <Button
            label="Join Group"
            className="group-details__button"
            onClick={joinGroup}></Button>
        </div>
      </div>
    </main>
  );
};

export default GroupDetails;
