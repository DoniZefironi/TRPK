const Router = require('express');
const router = new Router();
const resultController = require('../controllers/resultController');

router.post('/', resultController.createResult);           // Создать результат
router.get('/', resultController.getResults);              // Получить все результаты
router.get('/:id', resultController.getResultById);        // Получить результат по ID
router.put('/:id', resultController.updateResult);         // Обновить результат
router.delete('/:id', resultController.deleteResult);      // Удалить результат

module.exports = router;