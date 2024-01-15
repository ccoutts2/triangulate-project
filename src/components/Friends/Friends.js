// import "./friends.scss";

const Friends = ({ friends, handleFriendClick }) => {
  return (
    <aside>
      <ul>
        {friends &&
          friends.map((friend) => {
            return (
              <li
                key={friend.id}
                className="friend__item"
                onClick={() => {
                  handleFriendClick(friend);
                }}>
                <img className="friend__image" alt="red box profile"></img>
                <h3>{friend.name}</h3>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default Friends;
