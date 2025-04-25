const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/topic/:topicId', postController.getByTopic);

router.post('/', postController.create);

router.put('/:id', postController.update);

module.exports = router;
