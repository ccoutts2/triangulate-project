import "./pub-location.scss";
import * as geolib from "geolib";
import { useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
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

  // useEffect(() => {
  //   const geoLocation = geolib.getDistance(
  //     { latitude: 51.5103, longitude: 7.49347 },
  //     { latitude: "51° 31' N", longitude: "7° 28' E" }
  //   );

  //   console.log(geoLocation);

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(
  //         "You are ",
  //         position.coords,
  //         geolib.getDistance(position.coords, {
  //           latitude: 51.525,
  //           longitude: 7.4575,
  //         }),
  //         "meters away from 51.525, 7.4575"
  //       );
  //     },
  //     () => {
  //       alert("Position could not be determined.");
  //     }
  //   );
  // }, []);

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
