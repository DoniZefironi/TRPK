import React from 'react';
import './Landing.css'; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="navbar">
        <nav className="menu">
          <a href="#about-us">О нас</a>
          <a href="#courses">Курсы</a>
          <a href="#events">События</a>
          <a href="#blog">Блог</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <div className="auth-buttons">
          <button className="consultation-btn">Получить консультацию</button>
          <a href="#login">Войти / Зарегистрироваться</a>
        </div>
      </header>

      <main className="main-section">
        <div className="main-content">
          <div className="play-showreel">
            <button className="play-btn">▶</button>
            <span>Воспроизвести шоурил</span>
          </div>
          <h1 className="main-heading">Онлайн-школа информатики и вычислительной техники</h1>
          <div className="action-buttons">
            <button className="about-btn">О нас</button>
            <button className="courses-btn">Выбрать курс</button>
          </div>
        </div>
        <div className="main-image">
          <img src="path/to/illustration.png" alt="Иллюстрация людей с компьютером" />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
