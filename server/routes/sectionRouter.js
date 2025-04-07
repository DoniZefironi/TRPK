const Router = require('express');
const sectionController = require('../controllers/sectionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = Router();

router.get('/sections', sectionController.getAll);
router.post('/sections', authMiddleware, sectionController.create);
router.get('/sections/:type/:id', sectionController.getOne);

module.exports = router;
