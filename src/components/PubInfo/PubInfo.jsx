import "./pub-info.scss";

const PubInfo = ({ selectedPub }) => {
  // if (!selectedPub) {
  //   return <p>Loading..</p>;
  // }

  // const { id, pub, address } = selectedPub;

  // console.log(id);

  return (
    <section className="pub-info">
      <article className="pub-info__row">
        <h3 className="pub-info__details">Name</h3>
        <h3 className="pub-info__details">Address</h3>
        <h3 className="pub-info__details">Rating</h3>
        <h3 className="pub-info__details">Distance</h3>
        <h3 className="pub-info__details">Travel</h3>
      </article>

      <article className="pub-info__row">
        <p className="pub-info__details">{selectedPub.id}</p>
        <p className="pub-info__details">{selectedPub.pub}</p>
        {/* <p className="pub-info__details">{address.latitude}</p>
        <p className="pub-info__details">{address.longitude}</p> */}
        <p className="pub-info__details">travel</p>
      </article>
    </section>
  );
};

export default PubInfo;
