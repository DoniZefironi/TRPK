const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

router.get('/', sectionController.getAll);

router.post('/', sectionController.create);

router.get('/:id', sectionController.getOne);

router.put('/:id', sectionController.update);

router.delete('/:id', sectionController.delete);

module.exports = router;
