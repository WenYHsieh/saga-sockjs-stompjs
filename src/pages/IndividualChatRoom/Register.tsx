import React from 'react';
import { useDispatch } from 'react-redux';
import { PageRoutes } from '.';
import { FETCH_CHANNEL_CONNECTION } from '../../model';
import './style.scss';

type Props = {
  setPageRoutes: React.Dispatch<React.SetStateAction<PageRoutes>>;
};
const Register = ({ setPageRoutes }: Props) => {
  const dispatch = useDispatch();
  const inputElement = React.useRef<HTMLInputElement>(null);

  const handleEnterFriendList = () => {
    const userName = inputElement.current?.value ?? '';
    dispatch(FETCH_CHANNEL_CONNECTION(userName));

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
      <input ref={inputElement}></input>
      <div className="enterButton" onClick={handleEnterFriendList}>
        進入朋友列表
      </div>
    </div>
  );
};

export default Register;
