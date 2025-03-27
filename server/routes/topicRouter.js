const Router = require('express');
const topicController = require('../controllers/topicController');
const router = Router();

router.post('/', topicController.createTopic); // Создание темы

router.get('/topics/:id_section', topicController.getTopics); // Получение тем в секции

module.exports = router;
