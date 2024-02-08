import "./groups.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import hero from "../../assets/images/hero.svg";

const Groups = () => {
  //   const { groupdId } = useParams();

  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;
  const [groups, setGroups] = useState(null);

  const fetchGroups = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/groups`);
      setGroups(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  if (!groups) {
    return null;
  }

  return (
    <main className="groups-page">
      <section className="groups-page__product-cards">
        {groups.map((group) => {
          return (
            <Link to={`/meet/${group.id}/pubs`}>
              <article key={group.id} className="groups-page__product-card">
                <img
                  className="groups-page__image"
                  src={hero}
                  alt="arty picture of people sitting at a bar"
                />
                <h3 className="groups-page__title">{group.group_name}</h3>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
};

export default Groups;
