const Router = require('express');
const router = new Router();
const emulatorLogController = require('../controllers/emulatorLogController');

router.post('/', emulatorLogController.createEmulatorLog);          // Создать лог
router.get('/', emulatorLogController.getEmulatorLogs);             // Получить все логи
router.get('/:id', emulatorLogController.getEmulatorLogById);       // Получить лог по ID
router.put('/:id', emulatorLogController.updateEmulatorLog);        // Обновить лог
router.delete('/:id', emulatorLogController.deleteEmulatorLog);     // Удалить лог

module.exports = router;