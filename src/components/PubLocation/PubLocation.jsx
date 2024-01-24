import "./pub-location.scss";
import * as geolib from "geolib";
import { useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

const PubLocation = () => {
  const [center, setCenter] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {
      const coordinates = geolib.getCenter([
        { latitude: 51.5074, longitude: -0.1278 },
        { latitude: 51.5081, longitude: -0.1281 },
        { latitude: 51.5093, longitude: -0.1277 },
        { latitude: 51.5111, longitude: -0.128 },
        { latitude: 51.5099, longitude: -0.1335 },
        { latitude: 51.5102, longitude: -0.1305 },
      ]);

      setCenter(coordinates);

      const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
      const mapBoxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places";

      const findAddress = async () => {
        try {
          const { data } = await axios.get(
            `${mapBoxURL}/${coordinates.longitude},${coordinates.latitude}.json?access_token=${mapboxAccessToken}`
          );
          console.log(data);
          setAddress(data.features[0].place_name);
        } catch (error) {
          console.log(error);
        }
      };

      findAddress();
    });
  }, []);

  return (
    <section className="pub-info">
      <h3>Triangulate</h3>
      <p>Address: {address}</p>
    </section>
  );
};

export default PubLocation;
