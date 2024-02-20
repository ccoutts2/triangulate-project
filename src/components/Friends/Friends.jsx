import "./friends.scss";
import Button from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { MdGroupAdd } from "react-icons/md";

const Friends = ({ friends, handleFriendClick }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const onClick = () => {
    navigate(`/groups/${groupId}`);
  };

  if (!friends || friends.length === 0) {
    return (
      <div>
        <p>This group has no users in it</p>
        <p>Join it and ask your friends to join too</p>
        <Button
          className="friends__button"
          label={<MdGroupAdd />}
          onClick={onClick}></Button>
      </div>
    );
  }
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
