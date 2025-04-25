const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.get('/section/:sectionId', topicController.getBySection);

router.post('/', topicController.create);

router.get('/:id', topicController.getOne);

router.put('/:id', topicController.update);

router.delete('/:id', topicController.delete);

module.exports = router;
