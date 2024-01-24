import "./pub-location.scss";
import * as geolib from "geolib";
import { useState, useEffect } from "react";

const PubLocation = () => {
  const [center, setCenter] = useState({ latitude: 0, longitude: 0 });

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
    });
  }, []);

  return (
    <section className="pub-info">
      <p>Center Latitude: {center.latitude} </p>
      <p>Center Longitude: {center.longitude}</p>
    </section>
  );
};

export default PubLocation;
