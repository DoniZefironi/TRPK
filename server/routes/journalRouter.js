const Router = require('express');
const journalController = require('../controllers/journalController');
const router = new Router();

// Маршруты
router.post('/', journalController.createJournal); // Создать запись журнала
router.get('/', journalController.getJournals); // Получить все записи журнала
router.get('/:id', journalController.getJournalById); // Получить запись по ID
router.put('/:id', journalController.updateJournal); // Обновить запись журнала
router.delete('/:id', journalController.deleteJournal); // Удалить запись журнала

module.exports = router;