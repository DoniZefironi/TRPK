const Router = require('express');
const router = new Router();
const resultController = require('../../controllers/ControllersForElectric/resultElectricController');

router.post('/', resultController.createResult);         
router.get('/', resultController.getResults);             
router.get('/:id', resultController.getResultById);      
router.put('/:id', resultController.updateResult);       
router.delete('/:id', resultController.deleteResult);     

module.exports = router;