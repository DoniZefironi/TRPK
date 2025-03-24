import React from 'react';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>Войти</h2>
        <p>Войдите в свою учетную запись, используя адрес электронной почты и пароль, указанные при регистрации.</p>
        <form>
          <label>
            Электронная почта
            <input type="email" placeholder="Ваш рабочий адрес электронной почты" />
          </label>
          <label>
            Пароль
            <input type="password" placeholder="Введите пароль" />
          </label>
          <div className="checkbox-container">
            <input type="checkbox" id="stay-logged-in" />
            <label htmlFor="stay-logged-in">Оставаться в системе</label>
          </div>
          <a href="#forgot-password" className="forgot-password">Забыли пароль?</a>
          <button type="submit" className="login-btn">Войти</button>
        </form>
        <p>
          Нет аккаунта? <a href="#register" onClick={onClose}>Зарегистрируйтесь</a>
        </p>
        <p>Или войдите с помощью:</p>
        <div className="social-buttons">
          <button>Facebook</button>
          <button>Google</button>
          <button>Twitter</button>
          <button>LinkedIn</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;