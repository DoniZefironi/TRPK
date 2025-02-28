const Router = require('express');
const router = new Router();
const groupController = require('../../controllers/ControllersForElectric/groupElectricController');

router.post('/', groupController.createGroup);          
router.get('/', groupController.getGroups);            
router.get('/:id', groupController.getGroupById);        
router.put('/:id', groupController.updateGroup);         
router.delete('/:id', groupController.deleteGroup);     

module.exports = router;