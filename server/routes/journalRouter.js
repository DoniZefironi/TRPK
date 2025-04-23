const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для добавления, обновления и удаления записей

// Получение всех записей журнала по курсу с пагинацией
router.get('/:course', journalController.getJournal);

// Получение оценок конкретного студента
router.get('/:course/student/:id_user', journalController.getStudentGrades);

// Добавление новой записи в журнал (требуется авторизация)
router.post('/', journalController.addGrade);

// Обновление записи (требуется авторизация)
router.put('/:course/:id_journal', journalController.updateGrade);

// Удаление записи (требуется авторизация)
router.delete('/:course/:id_journal', journalController.deleteGrade);

module.exports = router;
