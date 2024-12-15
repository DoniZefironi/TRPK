const Router = require('express');
const lessonController = require('../controllers/lessonController');

const router = new Router();

// Создать урок
router.post('/', lessonController.createLesson);

// Получить все уроки
router.get('/', lessonController.getLessons);

// Получить урок по ID
router.get('/:id', lessonController.getLessonById);

router.put('/:id', lessonController.updateLesson); 

// Удалить урок
router.delete('/:id', lessonController.deleteLesson);

module.exports = router;
