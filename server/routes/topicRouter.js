const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const authMiddleware = require('../middleware/authMiddleware'); // Если требуется авторизация

// Получение тем форума по разделу с пагинацией
router.get('/section/:sectionId', topicController.getBySection);

// Создание новой темы (требуется авторизация)
router.post('/', topicController.create);

// Получение конкретной темы
router.get('/:id', topicController.getOne);

// Обновление темы (требуется авторизация)
router.put('/:id', topicController.update);

// Удаление темы (требуется авторизация)
router.delete('/:id', topicController.delete);

module.exports = router;
