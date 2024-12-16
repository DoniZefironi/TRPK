const Router = require('express');
const classesController = require('../controllers/classesController');

const router = new Router();

// Создать урок
router.post('/', classesController.createClasses);

// Получить все уроки
router.get('/', classesController.getClasses);

// Получить урок по ID
router.get('/:id', classesController.getClassesById);

router.put('/:id', classesController.updateClasses); 

// Удалить урок
router.delete('/:id', classesController.deleteClasses);

module.exports = router;
