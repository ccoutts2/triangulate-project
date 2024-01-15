// import "./Meet.scss";
import Map from "../../components/Map/Map";
import Friends from "../../components/Friends/Friends";
import SelectedFriend from "../../components/SelectedFriend/SelectedFriend";

import axios from "axios";
import { useRef, useEffect, useState } from "react";

const Meet = () => {
  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  const [friends, setFriends] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(false);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${baseURL}/maps`);
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
      <Friends friends={friends} handleFriendClick={handleFriendClick} />
      <SelectedFriend selectedFriend={selectedFriend} />
      <Map />
    </main>
  );
};

export default Meet;
