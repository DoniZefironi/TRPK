const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для защищенных маршрутов

// Общедоступные маршруты
router.post('/register', userController.register); // Регистрация
router.post('/login', userController.login); // Авторизация
router.post('/refresh', userController.refresh); // Обновление токена
router.post('/logout', userController.logout); // Выход из системы

// Защищенные маршруты (требуется авторизация)
router.get('/profile', authMiddleware, userController.getProfile); // Получение профиля текущего пользователя
router.put('/profile', authMiddleware, userController.updateProfile); // Обновление профиля текущего пользователя

module.exports = router;
