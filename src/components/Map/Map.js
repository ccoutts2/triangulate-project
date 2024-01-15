import "./map.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

const Map = () => {
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  mapboxgl.accessToken = mapboxAccessToken;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.0815);
  const [lat, setLat] = useState(51.54);
  const [zoom, setZoom] = useState(10.8);

  useEffect(() => {
    const baseURL = process.env.REACT_APP_FRIENDS_API_URL;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/meet`);
        const pubData = response.data;

        pubData.forEach((pub) => {
          const { id, name, address } = pub;
          const { latitude, longitude } = address;

          const marker = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map.current);

          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${name}</h3>`
          );
          marker.setPopup(popup);
        });
      } catch (error) {
        console.log("Error");
      }
    };

    fetchData();
  }, [lng, lat, zoom]);

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
      <div className="filler"></div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container"></div>
    </section>
  );
};

export default Map;
