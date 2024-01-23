import "./selected-friend.scss";

const SelectedFriend = ({ selectedFriend }) => {
  if (!selectedFriend) {
    return null;
  }

  const { name, homeAddress, favouriteDrink } = selectedFriend;

  return (
    <div className="container">
      <article className="friend-card">
        <div className="friend-card__profile"></div>
        <h2 className="friend-title">{name}</h2>
        <p className="friend-card__text">{homeAddress.latitude}</p>
        <p className="friend-card__text">{homeAddress.longitude}</p>
        <p className="friend-card__text">{favouriteDrink}</p>
      </article>
    </div>
  );
};

export default SelectedFriend;
