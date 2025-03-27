const Router = require('express');
const forumController = require('../controllers/allForumController');
const router = new Router();

router.get('/sections', forumController.getSections); // Получение секций
router.post('/sections', forumController.addSection); // Добавление секции

module.exports = router;
