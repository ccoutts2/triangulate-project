import "./add-new-pub.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import PubRating from "../../components/PubRating/PubRating";
import AddPubForm from "../../components/AddPubForm/AddPubForm";
import Button from "../../components/Button/Button";
import { CiLogout } from "react-icons/ci";

const AddNewPub = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formFields, setFormFields] = useState({
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0,
    pub: "",
    address: "",
  });

  useEffect(() => {
    const baseURL = process.env.REACT_APP_FRIENDS_API_URL;
    const loadData = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        return setFailedAuth(true);
      }

      try {
        const { data } = await axios.get(`${baseURL}/api/users/add-pub`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
        setFailedAuth(true);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <main className="pub-form__login">
        <p className="pub-form__login-text">
          You must be logged in to see this page
        </p>
        <p className="pub-form__login-text">
          {" "}
          <Link className="pub-form__link" to="/login">
            Log in
          </Link>
        </p>
      </main>
    );
  }

  const onChange = (event) => {
    const { name, value } = event.target;

    setFormFields((prevFields) => {
      return name === "group"
        ? { ...prevFields, group: value }
        : { ...prevFields, [name]: value };
    });
  };

  const isNameValid = () => {
    if (!formFields.pub.length) {
      return false;
    }

    return true;
  };

  const isAddressValid = () => {
    if (!formFields.address.length) {
      return false;
    }

    return true;
  };

  const isFormValid = () => {
    if (
      !formFields.rating1 ||
      !formFields.rating2 ||
      !formFields.rating3 ||
      !formFields.rating4 ||
      !formFields.rating5 ||
      !isNameValid() ||
      !isAddressValid() ||
      !formFields.group
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPub = {
      pub: formFields.pub,
      address: formFields.address,
      group: formFields.group,
      rating:
        Number(formFields.rating1) +
        Number(formFields.rating2) +
        Number(formFields.rating3) +
        Number(formFields.rating4) +
        Number(formFields.rating5),
    };

    if (isFormValid()) {
      await axios.post(process.env.REACT_APP_FRIENDS_API_URL + "/pubs", newPub);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        navigate("/meet");
      }, 2500);
    }
  };

  if (!user) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <>
      <form className="pub-form" onSubmit={handleSubmit}>
        <Button
          className="pub-form__signout-button"
          label={<CiLogout />}
          onClick={handleLogout}
        />
        <AddPubForm onChange={onChange} />
        <PubRating formFields={formFields} onChange={onChange} />
        <div className="pub-form__button-container">
          <Button className="pub-form__button" label="Add Pub" />
        </div>
      </form>
    </>
  );
};

export default AddNewPub;
