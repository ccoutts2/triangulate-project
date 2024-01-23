import "./meet.scss";
import Map from "../../components/Map/Map";
import PubInfo from "../../components/PubInfo/PubInfo";
import Friends from "../../components/Friends/Friends";
import SelectedFriend from "../../components/SelectedFriend/SelectedFriend";
// import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import axios from "axios";
import { useRef, useEffect, useState, useMemo } from "react";

const Meet = () => {
  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  const [friends, setFriends] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // const [popupInfo, setPopupInfo] = useState(null);
  // const [selectedPub, setSelectedPub] = useState(null);

  // console.log(selectedPub);

  // const [pubData, setPubData] = useState([]);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  // console.log(pubData);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${baseURL}/friends`);
      setFriends(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <main>
      <div className="friends-wrapper">
        <Friends friends={friends} handleFriendClick={handleFriendClick} />
        <SelectedFriend selectedFriend={selectedFriend} />
      </div>
      <div className="map-wrapper">
        <Map />
        <PubInfo />
      </div>
    </main>
  );
};

export default Meet;
