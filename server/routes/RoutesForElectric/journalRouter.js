const Router = require('express');
const journalController = require('../../controllers/ControllersForElectric/journalElectricController');
const router = new Router();

router.post('/', journalController.createJournal); 
router.get('/', journalController.getJournals); 
router.get('/:id', journalController.getJournalById); 
router.put('/:id', journalController.updateJournal); 
router.delete('/:id', journalController.deleteJournal);

module.exports = router;
