const Router = require('express');
const competitionController = require('../controllers/competitionController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

// Роуты для соревнований
router.post('/:type', competitionController.createCompetition);
router.get('/:type', competitionController.getCompetitions);
router.get('/:type/:id', competitionController.getCompetition);
router.put('/:type/:id', competitionController.updateCompetition);
router.delete('/:type/:id', competitionController.deleteCompetition);

// Роуты для результатов соревнований
router.post('/:type/results', competitionController.addResult);
router.get('/:type/results/:id_competition', competitionController.getResults);

module.exports = router;