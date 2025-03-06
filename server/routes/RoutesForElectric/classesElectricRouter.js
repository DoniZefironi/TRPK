const Router = require('express');
const classesController = require('../../controllers/ControllersForElectric/classesElectricController');

const router = new Router();

router.post('/', classesController.createClasses);
router.get('/', classesController.getClasses);
router.get('/:id', classesController.getClassesById);
router.put('/:id', classesController.updateClasses); 
router.delete('/:id', classesController.deleteClasses);

module.exports = router;
