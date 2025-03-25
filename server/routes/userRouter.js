const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const courseMiddleware = require('../middleware/courseMiddleware');

router.post('/register', userController.register); // Регистрация
router.post('/login', userController.login); // Авторизация
router.post('/refresh', userController.refresh); // Обновление токена
router.post('/logout', userController.logout); // Выход из системы

// Пример защищенных маршрутов на основе курса
router.get('/electronics-content', courseMiddleware('electronics'), (req, res) => {
  res.json({ message: 'Доступ разрешен к контенту для Электроники' });
});

router.get('/informatics-content', courseMiddleware('informatics'), (req, res) => {
  res.json({ message: 'Доступ разрешен к контенту для Информатики' });
});

router.get('/iot-content', courseMiddleware('IoT'), (req, res) => {
  res.json({ message: 'Доступ разрешен к контенту для IoT' });
});

module.exports = router; // Экспорт маршрутов
