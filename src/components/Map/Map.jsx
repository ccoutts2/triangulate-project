import "./map.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useEffect, useState, useMemo } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "https://api.tiles.mapbox.com/mapbox-gl-js/v3.1.0/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";
import marker from "../../assets/icons/marker-editor.svg";
import { clearStorage } from "mapbox-gl";

const Map = ({ setSelectedPub, setPubs, baseURL }) => {
  //   // Setting Map State

  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  mapboxgl.accessToken = mapboxAccessToken;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.0815);
  const [lat, setLat] = useState(51.54);
  const [zoom, setZoom] = useState(10.8);

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

  // Fetch Pub Data to display on Map - passed down as props to Map component

  const [jsonData, setJsonData] = useState(null);

  const fetchJson = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/pubs`);

      setJsonData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJson();
  }, []);

  // Display Pub Data on map

  useEffect(() => {
    if (jsonData) {
      map.current.on("load", () => {
        map.current.addLayer({
          id: "locations",
          type: "circle",

          source: {
            type: "geojson",
            data: jsonData,
          },
        });
      });

      map.current.on("click", (event) => {
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ["locations"],
        });

        if (!features.length) {
          return;
        }
        const feature = features[0];

        setSelectedPub(feature.properties);
      });
    }
  }, [jsonData]);

  function flyToStore(currentFeature) {
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 14,
    });
  }

  const buildLocationList = (jsonData) => {
    if (!jsonData) {
      return null;
    }
    return (
      <div className="map__listings">
        {jsonData.features.map((feature) => (
          <div key={feature.properties.id} className="map__item">
            <a
              onClick={() => {
                flyToStore(feature);
              }}
              href="#"
              className="map__title">
              {feature.properties.pub}
            </a>
            <div className="map__details">{feature.properties.address}</div>
          </div>
        ))}
      </div>
    );
  };

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

  // Find Address Function

  const listings = buildLocationList(jsonData);

  return (
    <section className="map">
      <div className="map__sidebar-container">
        <div className="map__sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <section className="map__desktop-container">
        {listings}
        <div ref={mapContainer} className="map__container"></div>
      </section>
    </section>
  );
};

export default Map;
