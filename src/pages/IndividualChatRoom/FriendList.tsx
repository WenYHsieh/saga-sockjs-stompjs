import { PageRoutes } from '.';
import './style.scss';

type Props = {
  setPageRoutes: React.Dispatch<React.SetStateAction<PageRoutes>>;
};
const FriendList = ({ setPageRoutes }: Props) => {
  const friends = ['嗚嗚', 'wolf'];
  const handleEnterChatRoom = () => {
    setPageRoutes((pageRoutes) => {
      return {
        ...pageRoutes,
        friendList: { isOpen: false },
        chatRoom: { isOpen: true },
      };
    });
  };
  return (
    <div className="container">
      <h4>朋友列表...</h4>
      {friends?.map((friend, index: number) => {
        return (
          <div key={index} className="friend" onClick={handleEnterChatRoom}>
            <span className="avatar"></span>
            <span>{friend}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FriendList;
