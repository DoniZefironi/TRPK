const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');

router.post('/:type', competitionController.createCompetition); // Создание соревнования
router.get('/:type', competitionController.getCompetitions); // Получение всех соревнований
router.put('/:type/:id', competitionController.updateCompetition); // Обновление соревнования
router.delete('/:type/:id', competitionController.deleteCompetition); // Удаление соревнования

// Работа с результатами
router.post('/:type/results', competitionController.addResult); // Добавление результата
router.get('/:type/results/:id_competition', competitionController.getResults); // Получение таблицы результатов

module.exports = router;
