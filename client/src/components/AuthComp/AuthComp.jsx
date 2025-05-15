import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser, clearAuthState } from '../../store/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import './AuthComp.css';

const AuthComp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    permissions: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  // Очистка ошибок при переключении между формами
  useEffect(() => {
    dispatch(clearAuthState());
    setFormErrors({});
  }, [isLogin, dispatch]);

  // Редирект при успешной аутентификации
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибки при изменении поля
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

const validateForm = () => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.email.trim()) {
    errors.email = 'Email обязателен';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Некорректный email';
  }

  if (!formData.password) {
    errors.password = 'Пароль обязателен';
  } else if (formData.password.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов';
  }

  if (!isLogin && !formData.username.trim()) {
    errors.username = 'Имя обязательно';
  }

  if (!isLogin && !formData.permissions) {
    errors.permissions = 'Выберите курс';
  }

  setFormErrors(errors);

  return Object.keys(errors).length === 0; // <-- Важно вернуть результат проверки
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (isLogin) {
        await dispatch(loginUser({ 
          email: formData.email, 
          password: formData.password 
        })).unwrap();
      } else {
        await dispatch(registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          permissions: formData.permissions
        })).unwrap();
        console.log('Отправляемые данные:', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          permissions: formData.permissions
        });
      }
    } catch (err) {
      console.error('Ошибка:', err.message || err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? (
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <h2>Войти</h2>
            <div className="form-group">
              <label htmlFor="email">Электронная почта</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ваш email"
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                className={formErrors.password ? 'error' : ''}
              />
              {formErrors.password && <span className="error-message">{formErrors.password}</span>}
            </div>
            {error && <div className="server-error">{error}</div>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Загрузка...' : 'Войти'}
            </button>
            <p className="toggle-form">
              Нет аккаунта? <button type="button" onClick={() => setIsLogin(false)}>Регистрация</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="register-form" noValidate>
            <h2>Регистрация</h2>
            <div className="form-group">
              <label htmlFor="username">Полное имя</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ваше имя"
                className={formErrors.username ? 'error' : ''}
              />
              {formErrors.username && <span className="error-message">{formErrors.username}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Электронная почта</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ваш email"
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                className={formErrors.password ? 'error' : ''}
              />
              {formErrors.password && <span className="error-message">{formErrors.password}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="permissions">Курс</label>
<select
  id="permissions"
  name="permissions"
  value={formData.permissions}
  onChange={handleChange}
>
  <option value="">Выберите курс</option>  {/* пустая опция */}
  <option value="Electric">Электроника</option>
  <option value="Informatics">Информатика</option>
  <option value="IoT">IoT</option>
</select>

            </div>
            {error && <div className="server-error">{error}</div>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
            <p className="toggle-form">
              Уже есть аккаунт? <button type="button" onClick={() => setIsLogin(true)}>Войти</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthComp;