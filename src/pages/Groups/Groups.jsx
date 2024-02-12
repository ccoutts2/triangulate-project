import "./groups.scss";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import axios from "axios";
import hero from "../../assets/images/hero.svg";
import Popup from "reactjs-popup";

const Groups = () => {
  //   const { groupdId } = useParams();
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_FRIENDS_API_URL;
  const [groups, setGroups] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formFields, setFormFields] = useState({ group: "" });

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

  const onChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const isFormValid = () => {
    if (!formFields.group.length) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newGroup = {
      group_name: event.target.group.value,
    };

    if (isFormValid()) {
      await axios.post(`${baseURL}/groups`, newGroup);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        window.location.reload();
      }, 500);
    }
  };

  return (
    <main className="groups-page">
      <h1 className="groups-page__header">Groups</h1>
      <section className="groups-page__product-cards">
        {groups.map((group) => {
          return (
            <Link to={`/meet/${group.id}/pubs`} className="groups-page__link">
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
      <Popup
        trigger={
          <Button label="Create Group" className="groups-page__button"></Button>
        }
        modal
        nested>
        {(close) => (
          <div className="modal">
            <div className="modal__header"> Create a new group </div>
            <form onSubmit={handleSubmit} className="modal__content">
              <label htmlFor="group" className="modal__label">
                Group Name:
              </label>
              <input
                type="text"
                name="group"
                id="group"
                className="modal__input"
                onChange={onChange}></input>
              <div className="modal__actions">
                <Button className="modal__button" label="Create Group"></Button>
                <Button
                  className="modal__button"
                  label="Cancel"
                  onClick={() => {
                    close();
                  }}></Button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    </main>
  );
};

export default Groups;
