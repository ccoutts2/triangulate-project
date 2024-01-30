import "./meet.scss";
import Map from "../../components/Map/Map";
import PubInfo from "../../components/PubInfo/PubInfo";
import Friends from "../../components/Friends/Friends";
import PubLocation from "../../components/PubLocation/PubLocation";
import SelectedFriend from "../../components/SelectedFriend/SelectedFriend";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

import axios from "axios";
import { useEffect, useState } from "react";

const Meet = () => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  const [friends, setFriends] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${baseURL}/friends`);
      setFriends(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const [selectedPub, setSelectedPub] = useState(null);
  const [pubs, setPubs] = useState(null);

  const fetchPub = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/pubs`);
      console.log(data);
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

  if (!selectedPub) return <p>Loading..</p>;

  const handlePubClick = (pub) => {
    setSelectedPub(pub);
  };

  const onClick = () => {
    navigate("/add-pub");
  };

  return (
    <main className="meet-page">
      <div className="friends-wrapper">
        <Friends friends={friends} handleFriendClick={handleFriendClick} />
        <SelectedFriend selectedFriend={selectedFriend} />
      </div>
      <div className="map-wrapper">
        <Map
          handlePubClick={handlePubClick}
          setSelectedPub={setSelectedPub}
          setPubs={setPubs}
          baseURL={baseURL}
        />
        <PubInfo selectedPub={selectedPub} />
        <PubLocation friends={friends} />
        <section>
          <p>Want to add more pubs to the list?</p>
          <Button className="button" label="Click here" onClick={onClick} />
        </section>
      </div>
    </main>
  );
};

export default Meet;
