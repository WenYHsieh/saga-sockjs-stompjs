import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FETCH_CONNECTION } from '../../model';
import './style.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const handleConnection = () => {
    dispatch(FETCH_CONNECTION());
  };
  return (
    <div className="home__wrapper">
      <div className="connection__blocks">
        <Link
          to="/random"
          className="connection__block"
          onClick={handleConnection}>
          隨機聊天
        </Link>
        <Link to="/individual" className="connection__block">
          跟朋友聊天
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
