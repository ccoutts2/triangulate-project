import "./friends.scss";

const Friends = ({ friends, handleFriendClick }) => {
  console.log(friends);
  return (
    <aside className="friends">
      <ul className="friends__list">
        {friends &&
          friends.map((friend) => {
            return (
              <li
                key={friend.user_name}
                className="friends__item"
                onClick={() => {
                  handleFriendClick(friend);
                }}>
                <div className="friends__icon"></div>
                <h3 className="friends__title">{friend.user_name}</h3>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default Friends;
