import "./pub-info.scss";

const PubInfo = ({ selectedPub }) => {
  if (!selectedPub) {
    return <p>Loading..</p>;
  }

  return (
    <section className="pub-info">
      <article className="pub-info__row">
        <h3 className="pub-info__title">Name</h3>
        <p className="pub-info__details">{selectedPub.pub}</p>
      </article>

      <article className="pub-info__row pub-info__row--address">
        <h3 className="pub-info__title">Address</h3>
        <p className="pub-info__details ">{selectedPub.address}</p>
      </article>
      <article className="pub-info__row">
        <h3 className="pub-info__title">Rating</h3>
        <p className="pub-info__details">{selectedPub.rating}</p>
      </article>
    </section>
  );
};

export default PubInfo;
