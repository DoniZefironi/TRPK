const Router = require('express');
const router = new Router();
const hackathonController = require('../../controllers/ControllersForElectric/hackathonElectricController');

router.post('/', hackathonController.createHackathon);        
router.get('/', hackathonController.getHackathons);             
router.get('/:id', hackathonController.getHackathonById);      
router.put('/:id', hackathonController.updateHackathon);         
router.delete('/:id', hackathonController.deleteHackathon);     

module.exports = router;