import React from 'react';
import './Header.css';
import logo from '../../img/logo.png'
import prof from '../../img/Profile.png'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Логотип" />
      </div>
      <nav className="navigation">
        <a href="#about-us">О нас</a>
        <a href="#courses">Курсы</a>
        <a href="#events">События</a>
        <a href="#blog">Блог</a>
        <a href="#contacts">Контакты</a>
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
