const Router = require('express');
const router = new Router();
const projectController = require('../../controllers/ControllersForElectric/projectElectricController');

router.post('/', projectController.createProject);       
router.get('/', projectController.getProjects);       
router.get('/:id', projectController.getProjectById); 
router.put('/:id', projectController.updateProject);       
router.delete('/:id', projectController.deleteProject);    

module.exports = router;