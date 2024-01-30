import "./add-pub-form.scss";

const AddPubForm = ({ onChange }) => {
  return (
    <section className="add-pub">
      <h2 className="add-pub__header">Add a Pub</h2>
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
          className="add-pub__input add-pub__input--input"></input>
        {/* <p className="upload__side-text">
          {formFields.description.length > 0
            ? `${formFields.description.length} / 300`
            : ""}
        </p> */}
      </div>
    </section>
  );
};

export default AddPubForm;
