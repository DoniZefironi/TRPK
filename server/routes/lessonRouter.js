const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для создания, обновления и удаления

// Получение всех уроков по курсу с пагинацией
router.get('/:course', lessonController.getAllLessons);

// Получение уроков по дате (фильтрация по курсу)
router.get('/:course/by-date', lessonController.getLessonsByDate);

// Получение конкретного урока по ID
router.get('/:course/:id', lessonController.getLesson);

// Создание нового урока (требуется авторизация)
router.post('/:course', lessonController.createLesson);

// Обновление урока (требуется авторизация)
router.put('/:course/:id', lessonController.updateLesson);

// Удаление урока (требуется авторизация)
router.delete('/:course/:id', lessonController.deleteLesson);

module.exports = router;
