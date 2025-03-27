const Router = require('express');
const sectionController = require('../controllers/sectionController');
const router = Router();

router.post('/', sectionController.addSection); // Добавление секции

module.exports = router;
