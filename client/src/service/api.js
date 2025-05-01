import axios from 'axios';

const API_URL = 'http://localhost:2280/api'; // 🔹 Укажите ваш серверный API

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Если сервер требует credentials (cookies, auth)
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}` // 🔹 Если используется токен
    }
});

export default api;
