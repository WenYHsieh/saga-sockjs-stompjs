import React from 'react';
import FriendList from './FriendList';
import Register from './Register';

export interface PageRoutes {
  registerForm: { isOpen: boolean };
  friendList: { isOpen: boolean };
  chatRoom: { isOpen: boolean };
}
const IndividualChatRoom = () => {
  const [pageRoutes, setPageRoutes] = React.useState({
    registerForm: {
      isOpen: true,
    },
    friendList: {
      isOpen: false,
    },
    chatRoom: {
      isOpen: false,
    },
  });
  return (
    <>
      {pageRoutes.registerForm.isOpen ? (
        <Register setPageRoutes={setPageRoutes} />
      ) : (
        <></>
      )}
      {pageRoutes.friendList.isOpen ? (
        <FriendList setPageRoutes={setPageRoutes} />
      ) : (
        <></>
      )}
    </>
  );
};

export default IndividualChatRoom;
