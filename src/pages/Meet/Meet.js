import "./meet.scss";
import Map from "../../components/Map/Map";
import PubInfo from "../../components/PubInfo/PubInfo";
import Friends from "../../components/Friends/Friends";
import SelectedFriend from "../../components/SelectedFriend/SelectedFriend";
// import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pins from "../../components/Pins/Pins";

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

  // useEffect(() => {
  //   const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}/maps`);
  //       setPubData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const friendMarkers = useMemo(
  //   () =>
  //     friends
  //       ? friends.map((friend) => (
  //           <Marker
  //             key={friend.id}
  //             longitude={friend.homeAddress.longitude}
  //             latitude={friend.homeAddress.latitude}
  //             onClick={(e) => {
  //               e.originalEvent.stopPropagation();
  //               setPopupInfo(friend);
  //             }}>
  //             <Pins />
  //           </Marker>
  //         ))
  //       : [],
  //   [friends]
  // );

  // const pins = useMemo(
  //   () =>
  //     pubData.map((pub) => (
  //       <Marker

  //         key={pub.id}
  //         longitude={pub.address.longitude}
  //         latitude={pub.address.latitude}
  //         onClick={(e) => {
  //           e.originalEvent.stopPropagation();
  //           setPopupInfo(pub);
  //         }}>

  //         <Pins />
  //       </Marker>
  //     )),

  //   [pubData]
  // );

  // const handlePubClick = (pub) => {
  //   setPubData(pub);
  // };

  return (
    <main>
      <div className="friends-wrapper">
        <Friends friends={friends} handleFriendClick={handleFriendClick} />
        <SelectedFriend selectedFriend={selectedFriend} />
      </div>
      <div className="map-wrapper">
        <Map />
        {/* <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: -0.0815,
            latitude: 51.54,
            zoom: 10.8,
          }}
          mapStyle="mapbox://styles/mapbox/dark-v11">
          {pins}
          {friendMarkers}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.homeAddress.longitude)}
              latitude={Number(popupInfo.homeAddress.latitude)}
              onClose={() => setPopupInfo(null)}>
              <p>{popupInfo.name}</p>
            </Popup>
          )}
        </Map> */}
        {/* <PubInfo selectedPub={selectedPub} handlePubClick={handlePubClick} /> */}
      </div>
    </main>
  );
};

export default Meet;
