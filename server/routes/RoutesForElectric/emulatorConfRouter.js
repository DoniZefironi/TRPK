const Router = require('express');
const router = new Router();
const emulatorConfController = require('../../controllers/ControllersForElectric/emulatorConfElectricController');

router.post('/', emulatorConfController.createEmulatorConfig);       
router.get('/', emulatorConfController.getEmulatorConfigs);            
router.get('/:id', emulatorConfController.getEmulatorConfigById);      
router.put('/:id', emulatorConfController.updateEmulatorConfig);       
router.delete('/:id', emulatorConfController.deleteEmulatorConfig);    

module.exports = router;