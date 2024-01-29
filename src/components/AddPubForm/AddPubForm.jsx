import "./add-pub-form.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddPubForm = ({ onChange }) => {
  return (
    <section className="add-pub">
      <h2 className="add-pub__header">Add a Pub</h2>
      <form className="add-pub__form">
        <label htmlFor="name" className="upload__label">
          Pub:
        </label>
        <input
          onChange={onChange}
          name="name"
          id="name"
          placeholder="Pub name"
          className="pub__input"></input>

        <label htmlFor="description" className="upload__label">
          Address:
        </label>
        <input
          onChange={onChange}
          name="description"
          id="description"
          placeholder="Add a description to your video"
          className="upload__input upload__input--input"></input>
        {/* <p className="upload__side-text">
          {formFields.description.length > 0
            ? `${formFields.description.length} / 300`
            : ""}
        </p> */}
      </form>
    </section>
  );
};

export default AddPubForm;
