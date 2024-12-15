const Router = require('express');
const forumController = require('../controllers/forumController');

const router = new Router();

// Создать форум
router.post('/', forumController.createForum);

// Получить все форумы
router.get('/', forumController.getForums);

// Получить форум по ID
router.get('/:id', forumController.getForumById);

// Обновить форум
router.put('/:id', forumController.updateForum);

// Удалить форум
router.delete('/:id', forumController.deleteForum);

module.exports = router;
