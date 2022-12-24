import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const HomePage = () => {
  return (
    <div className="home__wrapper">
      <div className="connection__blocks">
        <Link to="/random" className="connection__block">
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
