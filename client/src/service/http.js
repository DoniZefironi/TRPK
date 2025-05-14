import axios from 'axios';

// Создаем инстанс
const api = axios.create({
  baseURL: 'http://localhost:2280/api/competitions', // или просто `/api` если используется proxy
  timeout: 5000,
  withCredentials: true // если нужно слать куки
});

// --- Интерсепторы запросов (например, добавление токена)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // или sessionStorage, или из store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Интерсепторы ответов (например, глобальная обработка ошибок)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Можешь тут делать logout, если 401, или показывать уведомления
    if (error.response?.status === 401) {
      console.warn('Unauthorized. You can log out the user here.');
    }
    return Promise.reject(error);
  }
);

export default api;
