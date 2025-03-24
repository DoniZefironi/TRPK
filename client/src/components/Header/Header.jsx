import React from 'react';
import './Header.css';
import logo from '../../img/logo.png';
import prof from '../../img/Profile.png';
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
        <Link to="/about">О нас</Link>
        <Link to="/course">Курсы</Link>
        <a href="#events">События</a>
        <a href="#blog">Блог</a>
        <Link to="/contacts">Контакты</Link>
      </nav>
      <div className="header-actions">
        <button className="consultation-btn">Получить консультацию</button>
        <div className="regi">
          <img src={prof} alt="Профиль" />
          <Link to="/auth">Войти / Зарегистрироваться</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
