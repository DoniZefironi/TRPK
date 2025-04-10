const Router = require('express');
const router = Router();
const sectionController = require('../controllers/sectionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', sectionController.getAll);
router.get('/:id', sectionController.getOne);
router.post('/', sectionController.create);
router.delete('/:id', sectionController.delete);

module.exports = router;
