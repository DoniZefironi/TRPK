const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для добавления, обновления и удаления записей

router.get('/:course', journalController.getJournal);

router.get('/:course/student/:id_user', journalController.getStudentGrades);

router.post('/', journalController.addGrade);

router.put('/:course/:id_journal', journalController.updateGrade);

router.delete('/:course/:id_journal', journalController.deleteGrade);

module.exports = router;
