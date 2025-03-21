import React, { useState } from 'react';
import './Header.css';
import logo from '../../img/logo.png';
import prof from '../../img/Profile.png';
import { Link } from 'react-router-dom';
import LoginModal from '../../components/LoginModal/LoginModal'; 
import RegisterModal from '../../components/RegistrationModal/RegistrationModal';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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
        <div className="regi">
          <img src={prof} alt="Профиль" />
          <button onClick={() => setIsLoginModalOpen(true)} className="login-link">
            Войти
          </button>
          <button onClick={() => setIsRegisterModalOpen(true)} className="register-link">
            Зарегистрироваться
          </button>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </header>
  );
};

export default Header;
