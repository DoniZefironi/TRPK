const Router = require('express');
const router = new Router();
const emulatorLogController = require('../../controllers/ControllersForElectric/emulatorLogElectricController');

router.post('/', emulatorLogController.createEmulatorLog);          
router.get('/', emulatorLogController.getEmulatorLogs);             
router.get('/:id', emulatorLogController.getEmulatorLogById);       
router.put('/:id', emulatorLogController.updateEmulatorLog);        
router.delete('/:id', emulatorLogController.deleteEmulatorLog);    

module.exports = router;