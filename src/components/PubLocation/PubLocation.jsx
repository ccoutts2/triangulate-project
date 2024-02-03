import "./pub-location.scss";
import * as geolib from "geolib";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";

const PubLocation = ({ friends }) => {
  const [center, setCenter] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {
      const coordinates = geolib.getCenter(
        friends.map((friend) => {
          return {
            latitude: friend.homeAddress.latitude,
            longitude: friend.homeAddress.longitude,
          };
        })
      );

      setCenter(coordinates);

      // Reverse Geocode to retrieve address from coordinates

      const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
      const mapBoxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places";

      const findAddress = async () => {
        try {
          const { data } = await axios.get(
            `${mapBoxURL}/${coordinates.longitude},${coordinates.latitude}.json?access_token=${mapboxAccessToken}`
          );
          setAddress(data.features[0].place_name);
        } catch (error) {
          console.log(error);
        }
      };

      findAddress();
    });
  }, []);

  //   Add onClick to button

  const [showResults, setShowResults] = useState(false);
  const onClick = () => setShowResults(true);

  if (!friends && !address) {
    return <p>Loading...</p>;
  }

  return (
    <section className="pub-distance">
      <p className="pub-distance__text">
        Ever wondered where might be best to meet your friends?
      </p>
      <Button className="button" label="Triangulate" onClick={onClick} />
      {showResults ? <p className="pub-distance__address-text">{address}</p> : null}
    </section>
  );
};

export default PubLocation;
