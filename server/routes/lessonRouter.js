const express = require('express');
const router = express.Router();
const controller = require('../controllers/lessonController');

router.post('/:course', controller.create);

router.get('/:course', controller.getAll);

router.get('/:course/:id', controller.getById);

router.put('/:course/:id', controller.update);

router.delete('/:course/:id', controller.delete);

module.exports = router;