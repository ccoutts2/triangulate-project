import "./map.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  //   // Setting Map State

  //   const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  //   mapboxgl.accessToken = mapboxAccessToken;

  //   const mapContainer = useRef(null);
  //   const map = useRef(null);
  //   const [lng, setLng] = useState(-0.0815);
  //   const [lat, setLat] = useState(51.54);
  //   const [zoom, setZoom] = useState(10.8);

  //   const bounds = [
  //     [-0.3275, 51.4108], // Southwest coordinates
  //     [0.0374, 51.6103], // Northeast coordinates
  //   ];

  //   useEffect(() => {
  //     if (map.current) return;
  //     map.current = new mapboxgl.Map({
  //       container: mapContainer.current,
  //       style: "mapbox://styles/mapbox/dark-v11",
  //       center: [lng, lat],
  //       zoom: zoom,
  //       maxBounds: bounds,
  //     });

  //     if (!map.current) return;
  //     map.current.on("move", () => {
  //       setLng(map.current.getCenter().lng.toFixed(4));
  //       setLat(map.current.getCenter().lat.toFixed(4));
  //       setZoom(map.current.getZoom().toFixed(2));
  //     });
  //   });

  // useEffect(() => {
  //   const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}/maps`);
  //       const pubData = response.data;

  //       pubData.forEach((pub) => {
  //         console.log(pub);

  //         const marker = new mapboxgl.Marker()
  //           .setLngLat([pub.address.longitude, pub.address.latitude])
  //           .addTo(map.current);

  //         const popup = new mapboxgl.Popup({ offset: 25 })
  //           .addClassName("custom-marker")
  //           .setHTML(`<h4>${pub.pub}</h4>`);
  //         marker.setPopup(popup);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [map, lng, lat, zoom]);

  //   useEffect(() => {
  //     const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(`${baseURL}/friends`);
  //         const friendData = response.data;

  //         friendData.forEach((friend) => {
  //           console.log(friend);

  //           const marker = new mapboxgl.Marker({
  //             color: "F3180A",
  //           })
  //             .setLngLat([friend.homeAddress.longitude, friend.homeAddress.latitude])
  //             .addTo(map.current);

  //           // const popup = new mapboxgl.Popup({
  //           //   offset: 25,
  //           // }).setHTML(`<h4>${friend.name}</h4>`);
  //           // marker.setPopup(popup);
  //         });
  //       } catch (error) {
  //         console.log(error); //
  //       }
  //     };

  //     fetchData();
  //   }, [map, lng, lat, zoom]);

  return (
    <section>
      <div></div>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container"></div> */}
    </section>
  );
};

export default Map;
