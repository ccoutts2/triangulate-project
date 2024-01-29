import "./pub-location.scss";
import * as geolib from "geolib";
import { useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Button from "../Button/Button";

const PubLocation = ({ friends }) => {
  const [center, setCenter] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState(null);

  console.log(friends);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {
      const coordinates = geolib.getCenter(
        friends.map((friend) => {
          console.log(friend);
          return {
            latitude: friend.homeAddress.latitude,
            longitude: friend.homeAddress.longitude,
          };
        })
      );

      setCenter(coordinates);

      // Revers Geocode to retrieve address from coordinates

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

  return (
    <section className="pub-info">
      <h3>Triangulate Calculator</h3>
      <Button className="button" label="Calculate" onClick={onClick} />
      {showResults ? <p>Address: {address}</p> : null}
    </section>
  );
};

export default PubLocation;
