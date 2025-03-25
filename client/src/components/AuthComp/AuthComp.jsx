import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../../store/slice/authSlice';
import './AuthComp.css';

const AuthComp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    permissions: 'electronics',
  });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      dispatch(registerUser(formData));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? (
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Войти</h2>
            <label>
              Электронная почта
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ваш email"
              />
            </label>
            <label>
              Пароль
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
              />
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={isLoading}>
              Войти
            </button>
            <p>
              Нет аккаунта? <button onClick={() => setIsLogin(false)}>Регистрация</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            <h2>Регистрация</h2>
            <label>
              Полное имя
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ваше имя"
              />
            </label>
            <label>
              Электронная почта
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ваш email"
              />
            </label>
            <label>
              Пароль
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
              />
            </label>
            <label>
              Курс
              <select
                name="permissions"
                value={formData.permissions}
                onChange={handleChange}
              >
                <option value="electronics">Электроника</option>
                <option value="informatics">Информатика</option>
                <option value="iot">IoT</option>
              </select>
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={isLoading}>
              Зарегистрироваться
            </button>
            <p>
              Уже есть аккаунт? <button onClick={() => setIsLogin(true)}>Войти</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthComp;
