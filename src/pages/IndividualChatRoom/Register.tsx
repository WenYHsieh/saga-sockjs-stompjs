import React from 'react';
import { PageRoutes } from '.';
import './style.scss';

type Props = {
  setPageRoutes: React.Dispatch<React.SetStateAction<PageRoutes>>;
};
const Register = ({ setPageRoutes }: Props) => {
  const inputElement = React.useRef();

  const handleEnterFriendList = () => {
    //TODO connect and subscribe /user/queue/notifications
    setPageRoutes((pageRoutes) => {
      return {
        ...pageRoutes,
        friendList: { isOpen: true },
        registerForm: { isOpen: false },
      };
    });
  };
  return (
    <div className="register__wrapper">
      <div>輸入暱稱</div>
      <input ref={inputElement.current}></input>
      <div className="enterButton" onClick={handleEnterFriendList}>
        進入朋友列表
      </div>
    </div>
  );
};

export default Register;
