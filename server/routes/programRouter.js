const Router = require('express');
const router = new Router();
const programController = require('../controllers/programController');

// Маршруты для программ стажировки
router.post('/', programController.createProgram); // Создать программу
router.get('/', programController.getPrograms); // Получить все программы
router.get('/:id', programController.getProgramById); // Получить программу по ID
router.put('/:id', programController.updateProgram); // Обновить программу
router.delete('/:id', programController.deleteProgram); // Удалить программу

module.exports = router;