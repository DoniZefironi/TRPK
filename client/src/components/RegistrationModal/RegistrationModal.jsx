import React from 'react';
import './RegistrationModal.css';

const RegistrationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <h2>Зарегистрироваться</h2>
        <form>
          <label>
            Полное имя
            <input type="text" placeholder="Ваше полное имя" />
          </label>
          <label>
            Электронная почта
            <input type="email" placeholder="Введите email" />
          </label>
          <label>
            Пароль
            <input type="password" placeholder="Введите пароль" />
          </label>
          <label>
            Подтвердите пароль
            <input type="password" placeholder="Повторите пароль" />
          </label>
          <div className="checkbox-container">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Запомнить меня</label>
          </div>
          <button type="submit" className="register-btn">
            Зарегистрироваться
          </button>
        </form>
        <p>
          У вас уже есть аккаунт?{' '}
          <a href="#login" onClick={onClose}>
            Войти
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationModal;
