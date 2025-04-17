const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

router.post('/:course/grades', journalController.addGrade); // Добавление оценки и успеваемости
router.get('/:course', journalController.getJournal); // Получение всех записей
router.put('/:course/:id_journal', journalController.updateGrade); // Обновление оценки и успеваемости
router.delete('/:course/:id_journal', journalController.deleteGrade); // Удаление записи

module.exports = router;
