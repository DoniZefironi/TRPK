const Router = require('express');
const router = Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Получение сообщений
router.get('/topic/:topicId', postController.getByTopic);

// Создание сообщения (требуется авторизация)
router.post('/', postController.create);

module.exports = router;