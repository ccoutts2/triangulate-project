import "./meet.scss";
import Map from "../../components/Map/Map";
import PubInfo from "../../components/PubInfo/PubInfo";
import Friends from "../../components/Friends/Friends";
import PubLocation from "../../components/PubLocation/PubLocation";
import SelectedFriend from "../../components/SelectedFriend/SelectedFriend";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useEffect, useState } from "react";
import redMarker from "../../assets/icons/mapbox-marker-icon-red.svg";

const Meet = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  const params = useParams();
  const [friends, setFriends] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const fetchFriends = async (groupId) => {
    try {
      const { data } = await axios.get(`${baseURL}/users/${groupId}`);
      setFriends(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFriends(params.groupId);
  }, []);

  const [selectedPub, setSelectedPub] = useState(null);
  const [pubs, setPubs] = useState(null);

  const fetchPub = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/pubs`);
      setSelectedPub(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPub();
  }, []);

  const fetchPubs = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/pubs`);
      setPubs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPubs();
  }, []);

  if (!selectedPub && !friends) return <p>Loading..</p>;

  const handlePubClick = (pub) => {
    setSelectedPub(pub);
  };

  const onClick = () => {
    navigate("/add-pub");
  };

  return (
    <main className="meet-page">
      <div className="map-wrapper">
        <div className="map-wrapper__key-container">
          <p className="map-wrapper__key">
            Friends Marker: <img src={redMarker} alt="red marker"></img>
          </p>
          <p className="map-wrapper__key">
            Pub Marker:<span className="map-wrapper__dot"></span>
          </p>
        </div>
        <Map
          handlePubClick={handlePubClick}
          setSelectedPub={setSelectedPub}
          setPubs={setPubs}
          baseURL={baseURL}
          friends={friends}
        />
        <PubInfo selectedPub={selectedPub} />
        <div className="friends-wrapper">
          <Friends friends={friends} handleFriendClick={handleFriendClick} />
          <SelectedFriend selectedFriend={selectedFriend} />
        </div>
        <PubLocation pubs={pubs} friends={friends} />
        <section className="meet-page__add-pub-section">
          <p className="meet-page__add-pub-text">
            Want to add more pubs to the list?
          </p>
          <Button className="button" label="Click here" onClick={onClick} />
        </section>
      </div>
    </main>
  );
};

export default Meet;
