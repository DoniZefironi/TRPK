const Router = require('express');
const router = new Router();
const careerGuidanceController = require('../controllers/careerGuidanceController');

router.post('/', 
    careerGuidanceController.create
);

router.get('/', careerGuidanceController.getAll);

router.get('/by-date', careerGuidanceController.getByDate);

router.get('/:id_guidance', careerGuidanceController.getOne);

router.put('/:id_guidance', 
    careerGuidanceController.update
);

router.delete('/:id_guidance', 
    careerGuidanceController.delete
);

module.exports = router;