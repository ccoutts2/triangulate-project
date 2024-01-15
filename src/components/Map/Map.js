import "./map.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Friends from "../Friends/Friends";
import SelectedFriend from "../SelectedFriend/SelectedFriend";

const Map = () => {
  // Setting Friends State

  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  const [friends, setFriends] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(false);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${baseURL}/meet`);
      setFriends(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  // Setting Map State

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  mapboxgl.accessToken = mapboxAccessToken;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.0815);
  const [lat, setLat] = useState(51.54);
  const [zoom, setZoom] = useState(10.8);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  //   const mapContainer = useRef(null);
  //   const map = useRef(null);
  //   const [lng, setLng] = useState(51.5072);
  //   const [lat, setLat] = useState(0.1276);
  //   const [zoom, setZoom] = useState(9);
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     fetchMap();
  //   }, []);

  //   const fetchMap = async () => {
  //     try {
  //       if (map.current) return;
  //       map.current = new mapboxgl.Map({
  //         container: mapContainer.current,
  //         style: "mapbox://styles/mapbox/streets-v12",
  //         center: [longitude, latitude],
  //         zoom: zoom,
  //       });

  //       map.current.on("move", () => {
  //         setLongitude(map.current.getCenter().longitude.toFixed(4));
  //         setLatitude(map.current.getCenter().latitude.toFixed(4));
  //         setZoom(map.current.getZoom().toFixed(2));
  //       });
  //     } catch (error) {
  //       console.log("map initialisation error:", error);
  //     }
  //   };

  //   if (isLoading) {
  //     return <p>There's something wrong, contact support...</p>;
  //   }

  //   if (!map.current) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <section>
      <Friends friends={friends} handleFriendClick={handleFriendClick} />
      <SelectedFriend selectedFriend={selectedFriend} />
      <div className="filler"></div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container"></div>
    </section>
  );
};

export default Map;
