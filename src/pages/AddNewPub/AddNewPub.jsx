import "./add-new-pub.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PubRating from "../../components/PubRating/PubRating";
import AddPubForm from "../../components/AddPubForm/AddPubForm";

const AddNewPub = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    rating1: "",
    rating2: "",
    rating3: "",
    rating4: "",
    rating5: "",
    pub: "",
    address: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
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
      !isAddressValid()
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        navigate("/meet");
      }, 2500);
    }
  };

  return (
    <main>
      <h1></h1>
      <AddPubForm onChange={onChange} />
      <PubRating onChange={onChange} handleSubmit={handleSubmit} />
    </main>
  );
};

export default AddNewPub;
