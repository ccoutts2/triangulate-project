import "./pub-location.scss";
import * as geolib from "geolib";
import { useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Button from "../Button/Button";

const PubLocation = ({ pubs, friends }) => {
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const userCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        console.log(
          "You are ",
          geolib.getDistance(
            userCoords,
            pubs.features.map((pub) => {
              return {
                latitude: pub.geometry.coordinates[1],
                longitude: pub.geometry.coordinates[0],
              };
            })
          ),
          "meters away from address"
        );
      },
      () => {
        alert("Position could not be determined.");
      }
    );
  }, []);

  // Idea is to then sort the list by distance so you can see the closest pubs to go to - pub crawl generation

  //   Add onClick to button

  const [showResults, setShowResults] = useState(false);
  const onClick = () => setShowResults(true);

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
