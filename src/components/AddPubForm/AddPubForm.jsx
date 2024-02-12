import { Link } from "react-router-dom";
import "./add-pub-form.scss";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const AddPubForm = ({ onChange }) => {
  return (
    <section className="add-pub">
      <h2 className="add-pub__header">
        <Link to="/meet" className="add-pub__icon">
          <IoArrowBackCircleOutline />
        </Link>{" "}
        Add Pub
      </h2>
      <div className="add-pub__form">
        <label htmlFor="pub" className="add-pub__label">
          Pub:
        </label>
        <input
          onChange={onChange}
          name="pub"
          id="pub"
          placeholder="Enter the pub's name"
          className="add-pub__input"></input>

        <label htmlFor="address" className="add-pub__label">
          Address:
        </label>
        <input
          onChange={onChange}
          name="address"
          id="address"
          placeholder="Add the address of the pub"
          className="add-pub__input"></input>

        <label htmlFor="group" className="add-pub__label">
          Group:
        </label>
        <select
          onChange={(e) => onChange(e, "group")}
          name="group"
          id="group"
          className="add-pub__input">
          <option className="add-pub__input" value="select a group">
            Select a group
          </option>
          <option className="add-pub__input" value="1">
            1
          </option>
          <option className="add-pub__input" value="2">
            2
          </option>
        </select>
      </div>
    </section>
  );
};

export default AddPubForm;
