const Router = require('express');
const materialController = require('../controllers/materialController');
const router = new Router();

router.post('/', materialController.createMaterial); 
router.get('/', materialController.getAllMaterials);
router.get('/:id', materialController.getMaterialById); 
router.delete('/:id', materialController.deleteMaterial); 
router.put('/:id', materialController.updateMaterial); 

module.exports = router;
