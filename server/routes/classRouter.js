const Router = require('express');
const classController = require('../controllers/classController');
const router = new Router();

// Создать класс
router.post('/', classController.createClass);

// Получить все классы
router.get('/', classController.getAllClasses);

// Получить класс по id
router.get('/:id', classController.getClassById);

// Обновить класс
router.put('/:id', classController.updateClass);

// Удалить класс
router.delete('/:id', classController.deleteClass);

module.exports = router;
