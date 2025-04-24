const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для создания, обновления и удаления

router.get('/:course', lessonController.getAllLessons);

router.get('/:course/by-date', lessonController.getLessonsByDate);

router.get('/:course/:id', lessonController.getLesson);

router.post('/:course', lessonController.createLesson);

router.put('/:course/:id', lessonController.updateLesson);

router.delete('/:course/:id', lessonController.deleteLesson);

module.exports = router;
