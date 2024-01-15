// import "./selected-friend.scss";

const SelectedFriend = ({ SelectedFriend }) => {
  if (!SelectedFriend) {
    return null; // or some placeholder content
  }
  return (
    <div>
      <article>
        <img></img>
        <h2>{SelectedFriend.name}</h2>
        <p>{SelectedFriend.homeAddress}</p>
        <p>{SelectedFriend.favouriteDrink}</p>
      </article>
    </div>
  );
};

export default SelectedFriend;
