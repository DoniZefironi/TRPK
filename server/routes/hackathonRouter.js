const Router = require('express');
const router = new Router();
const hackathonController = require('../controllers/hackathonController');

router.post('/', hackathonController.createHackathon);           // Создать хакатон
router.get('/', hackathonController.getHackathons);              // Получить все хакатоны
router.get('/:id', hackathonController.getHackathonById);        // Получить хакатон по ID
router.put('/:id', hackathonController.updateHackathon);         // Обновить хакатон
router.delete('/:id', hackathonController.deleteHackathon);      // Удалить хакатон

module.exports = router;