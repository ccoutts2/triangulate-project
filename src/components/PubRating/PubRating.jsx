import "./pub-rating.scss";

const PubRating = ({ onChange, formFields }) => {
  const renderRatingInputs = (questionNumber) => {
    const labels = ["0", "2", "4", "6", "8", "10"];

    return labels.map((label, index) => (
      <div
        key={`rating${questionNumber}_${index}`}
        className="pub-ratings__input-container">
        <label htmlFor={`rating${questionNumber}_${index}`}>{label}</label>
        <input
          className="pub-ratings__radio"
          type="radio"
          name={`rating${questionNumber}`}
          id={`rating${questionNumber}_${index}`}
          value={index * 2}
          onChange={onChange}
        />
      </div>
    ));
  };

  return (
    <section className="pub-ratings">
      <h2 className="pub-ratings__header">Add a Rating</h2>
      <div className="pub-ratings__form">
        {/* Question 1 */}
        <div className="pub-ratings__question-container">
          <h3 className="pub-ratings__title">Prices</h3>
          <div className="pub-ratings__container">{renderRatingInputs(1)}</div>
        </div>

        {/* Question 2 */}
        <div className="pub-ratings__question-container">
          <h3 className="pub-ratings__title">Range of drinks</h3>
          <div className="pub-ratings__container">{renderRatingInputs(2)}</div>
        </div>

        {/* Question 3 */}
        <div className="pub-ratings__question-container">
          <h3 className="pub-ratings__title">Beer Garden</h3>
          <div className="pub-ratings__container">{renderRatingInputs(3)}</div>
        </div>

        {/* Question 4 */}
        <div className="pub-ratings__question-container">
          <h3 className="pub-ratings__title">Atmosphere</h3>
          <div className="pub-ratings__container">{renderRatingInputs(4)}</div>
        </div>

        {/* Question 5 */}
        <div className="pub-ratings__question-container">
          <h3 className="pub-ratings__title">Service</h3>
          <div className="pub-ratings__container">{renderRatingInputs(5)}</div>
        </div>

        <p className="pub-ratings__result">
          Don't worry about counting, I'll take care of that for you{" "}
        </p>
        <p className="pub-ratings__arrow">&#8675;</p>
        <p className="pub-ratings__result">
          Rating:{" "}
          {Number(formFields.rating1) +
            Number(formFields.rating2) +
            Number(formFields.rating3) +
            Number(formFields.rating4) +
            Number(formFields.rating5)}
        </p>
      </div>
    </section>
  );
};

export default PubRating;
