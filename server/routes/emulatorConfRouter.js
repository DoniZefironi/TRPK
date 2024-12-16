const Router = require('express');
const router = new Router();
const emulatorConfController = require('../controllers/emulatorConfController');

router.post('/', emulatorConfController.createEmulatorConfig);         // Создать конфигурацию
router.get('/', emulatorConfController.getEmulatorConfigs);            // Получить все конфигурации
router.get('/:id', emulatorConfController.getEmulatorConfigById);      // Получить конфигурацию по ID
router.put('/:id', emulatorConfController.updateEmulatorConfig);       // Обновить конфигурацию
router.delete('/:id', emulatorConfController.deleteEmulatorConfig);    // Удалить конфигурацию

module.exports = router;