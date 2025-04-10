const Router = require('express');
const router = Router();
const topicController = require('../controllers/topicController');
const authMiddleware = require('../middleware/authMiddleware');

// Получение тем
router.get('/section/:sectionId', topicController.getBySection);
router.get('/:id', topicController.getOne);

// Создание темы (требуется авторизация)
// В topicRouter.js
router.post('/', authMiddleware, topicController.create);

module.exports = router;