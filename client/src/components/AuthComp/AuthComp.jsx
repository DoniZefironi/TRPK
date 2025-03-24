import React, { useState } from 'react';
import './AuthComp.css';

const AuthComp = () => {
  const [isLogin, setIsLogin] = useState(true); 

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? (
          <div className="login-form">
            <h2>Войти</h2>
            <form>
              <label>
                Электронная почта
                <input type="email" placeholder="Ваш рабочий адрес электронной почты" />
              </label>
              <label>
                Пароль
                <input type="password" placeholder="Введите пароль" />
              </label>
              <button type="submit" className="auth-btn">Войти</button>
            </form>
            <p>
              Нет аккаунта?{' '}
              <button onClick={toggleForm} className="switch-link">Зарегистрируйтесь</button>
            </p>
          </div>
        ) : (
          <div className="register-form">
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
              <button type="submit" className="auth-btn">Зарегистрироваться</button>
            </form>
            <p>
              Уже есть аккаунт?{' '}
              <button onClick={toggleForm} className="switch-link">Войти</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthComp;
