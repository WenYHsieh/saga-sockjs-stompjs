import React from 'react';
import Register from './Register';

const IndividualChatRoom = () => {
  const [pageRoutes, setPageRoutes] = React.useState({
    registerForm: {
      isOpen: true,
    },
    friendLis: {
      isOpen: false,
    },
    chatRoom: {
      isOpen: false,
    },
  });
  return <> {pageRoutes.registerForm.isOpen ? <Register /> : <></>}</>;
};

export default IndividualChatRoom;
