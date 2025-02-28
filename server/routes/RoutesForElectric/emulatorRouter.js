const Router = require('express');
const router = new Router();
const emulatorController = require('../../controllers/ControllersForElectric/emulatorElectricController');

router.post('/', emulatorController.createEmulator);      
router.get('/', emulatorController.getEmulators);             
router.get('/:id', emulatorController.getEmulatorById);       
router.put('/:id', emulatorController.updateEmulator);        
router.delete('/:id', emulatorController.deleteEmulator);     

module.exports = router;