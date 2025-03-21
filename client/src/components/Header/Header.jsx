import React from 'react';
import './Header.css';
import logo from '../../img/logo.png'
import prof from '../../img/Profile.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
              <Link to="/">
      <div className="logo">
        <img src={logo} alt="Логотип" />
      </div>
      </Link>
      <nav className="navigation">
      <Link to="/about">
        <a href="#about-us">О нас</a>
        </Link>
                <Link to="/course">
        <a href="#courses">Курсы</a>
        </Link>
        <a href="#events">События</a>
        <a href="#blog">Блог</a>
        <Link to="/contacts">
        <a href="#contacts">Контакты</a>
        </Link>
      </nav>
      <div className="header-actions">
        <button className="consultation-btn">Получить консультацию</button>
        <div className='regi'>
        <img src={prof} alt="Логотип" />
        <a href="#login" className="login-link">Войти / Зарегистрироваться</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
