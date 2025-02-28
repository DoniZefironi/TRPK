const Router = require('express');
const olympiadController = require('../../controllers/ControllerForScholl/olympiadSchollController');

const router = new Router();

// Создать олимпиаду
router.post('/', olympiadController.createOlympiad);

// Получить все олимпиады
router.get('/', olympiadController.getOlympiads);

// Получить олимпиаду по ID
router.get('/:id', olympiadController.getOlympiadById);

// Обновить олимпиаду
router.put('/:id', olympiadController.updateOlympiad);

// Удалить олимпиаду
router.delete('/:id', olympiadController.deleteOlympiad);

module.exports = router;