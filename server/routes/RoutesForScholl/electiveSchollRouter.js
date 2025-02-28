const Router = require('express');
const electiveController = require('../../controllers/ControllerForScholl/electiveSchollController');

const router = new Router();

// Создать электив
router.post('/', electiveController.createElective);

// Получить все элективы
router.get('/', electiveController.getElectives);

// Получить электив по ID
router.get('/:id', electiveController.getElectiveById);

// Обновить электив
router.put('/:id', electiveController.updateElective);

// Удалить электив
router.delete('/:id', electiveController.deleteElective);

module.exports = router;