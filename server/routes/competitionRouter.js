const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');

router.post('/:type', competitionController.createCompetition); 
router.get('/:type', competitionController.getCompetitions); 
router.put('/:type/:id', competitionController.updateCompetition); 
router.delete('/:type/:id', competitionController.deleteCompetition); 

router.post('/:type/results', competitionController.addResult); 
router.get('/:type/results/:id_competition', competitionController.getResults); 

module.exports = router;
