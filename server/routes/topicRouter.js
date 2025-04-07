const Router = require('express');
const router = Router();
const topicController = require('../controllers/topicController');
const authMiddleware = require('../middleware/authMiddleware');

// Получение тем по разделу
router.get('/sections/:sectionType/:sectionId/topics', topicController.getBySection);

// Создание темы (требуется авторизация)
router.post('/topics', authMiddleware, topicController.create);

// Получение конкретной темы
router.get('/topics/:id', topicController.getOne);

module.exports = router;