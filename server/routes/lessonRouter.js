const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.post('/:course', lessonController.createLesson); // Создание урока/лекции
router.get('/:course', lessonController.getLessons); // Получение всех уроков/лекций
router.put('/:course/:id', lessonController.updateLesson); // Обновление урока/лекции
router.delete('/:course/:id', lessonController.deleteLesson); // Удаление урока/лекции

module.exports = router;
