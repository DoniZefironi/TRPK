const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для защищенных маршрутов

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/refresh', userController.refresh);

// Защищенные маршруты (требуется авторизация)
router.get('/profile/:userId', userController.getUserProfile);
router.put('/profile', userController.updateProfile); // Обновление профиля текущего пользователя

module.exports = router;
