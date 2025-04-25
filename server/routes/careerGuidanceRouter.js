const Router = require('express');
const router = new Router();
const careerGuidanceController = require('../controllers/careerGuidanceController');

router.post('/', 
    careerGuidanceController.create
);

router.get('/', careerGuidanceController.getAll);

router.get('/by-date', careerGuidanceController.getByDate);

router.get('/:id', careerGuidanceController.getOne);

router.put('/:id', 
    careerGuidanceController.update
);

router.delete('/:id', 
    careerGuidanceController.delete
);

module.exports = router;