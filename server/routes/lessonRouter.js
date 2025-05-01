const express = require('express');
const router = express.Router();
const controller = require('../controllers/lessonController');

// Создание лекции
router.post('/:course', controller.create);

// Получение всех лекций курса
router.get('/:course', controller.getAll);

// Получение лекции по ID
router.get('/:course/:id', controller.getById);

// Обновление лекции
router.put('/:course/:id', controller.update);

// Удаление лекции
router.delete('/:course/:id', controller.delete);

module.exports = router;