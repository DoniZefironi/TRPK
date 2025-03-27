const Router = require('express');
const postController = require('../controllers/postController');
const router = new Router();

router.post('/posts', postController.createPost); // Создание сообщения
router.get('/posts/:id_topic', postController.getPosts); // Получение сообщений в теме

module.exports = router;
