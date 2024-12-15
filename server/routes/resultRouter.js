const Router = require('express');
const resultController = require('../controllers/resultController');

const router = new Router();

// Создать результат олимпиады
router.post('/', resultController.createResult);

// Получить все результаты
router.get('/', resultController.getResults);

// Получить результат по ID
router.get('/:id', resultController.getResultById);

// Обновить результат
router.put('/:id', resultController.updateResult);

// Удалить результат
router.delete('/:id', resultController.deleteResult);

module.exports = router;
