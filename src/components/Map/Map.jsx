import "./map.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useEffect, useState, useMemo } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "https://api.tiles.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";
import marker from "../../assets/icons/marker-editor.svg";

const Map = ({ setSelectedPub, setPubs }) => {
  //   // Setting Map State

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  mapboxgl.accessToken = mapboxAccessToken;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.0815);
  const [lat, setLat] = useState(51.54);
  const [zoom, setZoom] = useState(10.8);

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/ccoutts2/clrt9em5u00jm01pe7nz59jc4",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("click", (event) => {
      const features = map.current.queryRenderedFeatures(event.point, {
        layers: ["london-pubs"],
      });

      if (!features.length) {
        return;
      }
      const feature = features[0];
      console.log(feature.properties);

      setSelectedPub(feature.properties);
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  // useMemo(() => {
  //   const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}/maps`);
  //       const pubData = response.data;

  //       pubData.forEach((pub) => {
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
  // }, []);

  useMemo(() => {
    const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/friends`);
        const friendData = response.data;

        friendData.forEach((friend) => {
          const marker = new mapboxgl.Marker({
            color: "#f3180a",
          })
            .setLngLat([friend.homeAddress.longitude, friend.homeAddress.latitude])
            .addTo(map.current);

          const popup = new mapboxgl.Popup({
            offset: 25,
          }).setHTML(`<h4>${friend.name}</h4>`);
          marker.setPopup(popup);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // useMemo(() => {
  //   const baseURL = process.env.REACT_APP_FRIENDS_API_URL;

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}/maps`);
  //       const pubData = response.data;

  //       pubData.features.forEach((feature) => {
  //         const coordinates = feature.geometry.coordinates;
  //         const properties = feature.properties;

  //         const marker = new mapboxgl.Marker({
  //           color: "green",
  //         })
  //           .setLngLat(coordinates)
  //           .addTo(map.current);

  //         const popup = new mapboxgl.Popup({
  //           offset: 25,
  //         }).setHTML(`<h4>${properties.pub}</h4>`);
  //         marker.setPopup(popup);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Find Address Function

  return (
    <section className="map">
      <div className="map__sidebar-container">
        <div className="map__sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div ref={mapContainer} className="map__container"></div>
    </section>
  );
};

export default Map;
