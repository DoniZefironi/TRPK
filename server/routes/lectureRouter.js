const Router = require('express');
const router = new Router();
const lectureController = require('../controllers/lectureController');

// Маршруты для лекций IoT
router.post('/', lectureController.createLecture); // Создать лекцию
router.get('/', lectureController.getLectures); // Получить все лекции
router.get('/:id', lectureController.getLectureById); // Получить лекцию по ID
router.put('/:id', lectureController.updateLecture); // Обновить лекцию
router.delete('/:id', lectureController.deleteLecture); // Удалить лекцию

module.exports = router;