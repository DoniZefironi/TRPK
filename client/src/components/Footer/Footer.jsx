import React from 'react';
import './Footer.css';
import logo from '../../img/logo.png'; 
import facebookIcon from '../../img/Facebook.png';
import twitterIcon from '../../img/Twitter.png';
import youtubeIcon from '../../img/YouTube.png';
import telegramIcon from '../../img/telegram.png';
import linkedinIcon from '../../img/Linked-In.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className='footer-top'>
      <div className="footer-column">
        <img src={logo} alt="Createx Logo" className="footer-logo" />
        <p className="footer-description">
          Createx Online School — лидер в сфере онлайн-обучения. У нас множество курсов и программ от ведущих экспертов
          рынка. Мы предоставляем актуальные подходы к онлайн-обучению, стажировкам и трудоустройству в крупнейших
          компаниях страны.
        </p>
        <div className="social-icons">
          <img src={facebookIcon} alt="Facebook" />
          <img src={twitterIcon} alt="Twitter" />
          <img src={youtubeIcon} alt="YouTube" />
          <img src={telegramIcon} alt="Telegram" />
          <img src={linkedinIcon} alt="LinkedIn" />
        </div>
      </div>

      <div className="footer-column">
        <h4 className="footer-heading">Карта сайта</h4>
        <ul className="footer-links">
          <li><a href="#about-us">О нас</a></li>
          <li><a href="#courses">Курсы</a></li>
          <li><a href="#events">События</a></li>
          <li><a href="#blog">Блог</a></li>
          <li><a href="#contacts">Контакты</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4 className="footer-heading">Курсы</h4>
        <ul className="footer-links">
          <li><a href="#electronics">Электроника</a></li>
          <li><a href="#english">Английский</a></li>
          <li><a href="#computer-science">Информатика</a></li>
          <li><a href="#iot">IoT</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4 className="footer-heading">Связаться с нами</h4>
        <p className="footer-contact">Телефон: (44) 730-04-86</p>
        <p className="footer-contact">Email: shabLinux@yandex.ru</p>
      </div>

      <div className="footer-column">
        <h4 className="footer-heading">Подпишитесь на нашу рассылку</h4>
        <p className="footer-newsletter-description">
          Подпишитесь на нашу рассылку, чтобы получать сообщения о ранних обновлениях от Createx SEO Agency.
        </p>
        <div className="footer-subscription">
          <input
            type="email"
            placeholder="Ваш адрес электронной почты"
            className="footer-input"
          />
          <button className="footer-button">Подписаться</button>
        </div>
      </div>
      </div>

      <div className="footer-bottom">
        <p>© Все права защищены. Сделано с ❤️ by Createx Studio</p>
      </div>
    </footer>
  );
};

export default Footer;
