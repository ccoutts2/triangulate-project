import { useEffect, useState } from "react";
import axios from "axios";
import "./groups.scss";

const Groups = () => {
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
      {groups.map((group) => {
        return (
          <article key={group.id}>
            <h3>{group.group_name}</h3>
          </article>
        );
      })}
    </main>
  );
};

export default Groups;
