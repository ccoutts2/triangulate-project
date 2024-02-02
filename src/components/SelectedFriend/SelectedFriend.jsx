import { useState, useEffect } from "react";
import "./selected-friend.scss";
import axios from "axios";

const SelectedFriend = ({ selectedFriend }) => {
  const [address, setAddress] = useState(null);

  // const { name, homeAddress, favouriteDrink } = selectedFriend;

  useEffect(() => {
    // Reverse Geocode to retrieve address from coordinates

    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const mapBoxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places";

    const findAddress = async () => {
      try {
        const { data } = await axios.get(
          `${mapBoxURL}/${selectedFriend.homeAddress.longitude},${selectedFriend.homeAddress.latitude}.json?access_token=${mapboxAccessToken}`
        );
        setAddress(data.features[0].place_name);
        console.log(data.features[0].place_name);
      } catch (error) {
        console.log(error);
      }
    };

    findAddress();
  }, [selectedFriend]);

  if (!selectedFriend && !address) {
    return null;
  }

  // const cutAddress = address.indexOf(", London");

  // const shortAddress = address.substring(0, cutAddress);

  return (
    <div className="container">
      <article className="friend-card">
        <div className="friend-card__profile"></div>
        <h2 className="friend-title">{selectedFriend.name}</h2>
        <p className="friend-card__text">{address}</p>
        {/* <p className="friend-card__text">{homeAddress.longitude}</p> */}
        <p className="friend-card__text">{selectedFriend.favouriteDrink}</p>
      </article>
    </div>
  );
};

export default SelectedFriend;
