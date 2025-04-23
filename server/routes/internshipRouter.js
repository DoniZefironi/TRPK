const Router = require('express');
const router = new Router();
const applicationController = require('../controllers/internshipApplicationController');
const programController = require('../controllers/internshipProgramController');
const authMiddleware = require('../middleware/authMiddleware');

// Роуты для заявок на стажировку
router.post('/applications', 
    applicationController.create
);

router.get('/applications', 
    applicationController.getAll
);

router.get('/applications/:id', 
    applicationController.getOne
);

router.put('/applications/:id', 
    applicationController.update
);

router.delete('/applications/:id', 
    applicationController.delete
);

// Роуты для программ стажировки
router.post('/programs', 
    programController.create
);

router.get('/programs', 
    programController.getAll
);

router.get('/programs/active', 
    programController.getActive
);

router.get('/programs/:id', 
    programController.getOne
);

router.put('/programs/:id', 
    programController.update
);

router.delete('/programs/:id', 
    programController.delete
);

module.exports = router;