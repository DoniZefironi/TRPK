const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для создания и обновления

// Получение всех сообщений по теме с пагинацией
router.get('/topic/:topicId', postController.getByTopic);

// Создание нового сообщения (требуется авторизация)
router.post('/', authMiddleware, postController.create);

// Обновление сообщения (требуется авторизация)
router.put('/:id', authMiddleware, postController.update);

module.exports = router;
