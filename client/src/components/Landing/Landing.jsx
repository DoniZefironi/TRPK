import React from 'react';
import './Landing.css';
import illustration from '../../img/illustration.png'; 
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main className="main-section">
      <div className="main-content">
        <h1 className="main-title">Онлайн-школа информатики и вычислительной техники</h1>
        <div className="action-buttons">
                <Link to="/about">
          <button className="about-btn">О нас</button>
          </Link>
                          <Link to="/course">
          <button className="choose-course-btn">Выбрать курс</button>
          </Link>
        </div>
      </div>
      <div className="main-image">
        <img src={illustration} alt="Иллюстрация человека за компьютером" />
      </div>
    </main>
  );
};

export default Landing;
