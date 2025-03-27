import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../img/logo.png';
import prof from '../../img/Profile.png';
import { logoutUser } from '../../store/slice/authSlice'; 

const Header = () => {
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false); 

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('token'); 
      if (!refreshToken) {
        throw new Error('Refresh token отсутствует');
      }
  
      await dispatch(logoutUser(refreshToken)); 
      localStorage.removeItem('user');
      localStorage.removeItem('token'); 
      setMenuOpen(false);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };
  

  const toggleMenu = () => setMenuOpen((prev) => !prev); 

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
        <Link to="/section">Блог</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>
      <div className="header-actions">
        <button className="consultation-btn">Получить консультацию</button>
        {user ? (
          <div className="profile-menu">
            <img
              src={prof}
              alt="Профиль"
              className="profile-icon"
              onClick={toggleMenu} 
            />
            {menuOpen && (
              <div className={`dropdown-menu ${menuOpen ? 'active' : ''}`}>
              <Link to="/profile">Профиль</Link>
              <button onClick={handleLogout}>Выйти</button>
            </div>
            )}
          </div>
        ) : (
          <div className="regi">
            <img src={prof} alt="Профиль" />
            <Link to="/auth">Войти / Зарегистрироваться</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
