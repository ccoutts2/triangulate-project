import "./add-new-pub.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PubRating from "../../components/PubRating/PubRating";
import AddPubForm from "../../components/AddPubForm/AddPubForm";
import Button from "../../components/Button/Button";

const AddNewPub = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0,
    pub: "",
    address: "",
  });

  console.log(formFields);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPub = {
      pub: event.target.pub.value,
      address: event.target.address.value,
      rating:
        Number(formFields.rating1) +
        Number(formFields.rating2) +
        Number(formFields.rating3) +
        Number(formFields.rating4) +
        Number(formFields.rating5),
    };

    if (isFormValid()) {
      await axios.post("http://192.168.0.16:8000" + "/pubs", newPub);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        navigate("/meet");
      }, 2500);
    }
  };

  return (
    <>
      <form className="pub-form" onSubmit={handleSubmit}>
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
