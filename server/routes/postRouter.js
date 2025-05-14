const express = require('express');
const router = express.Router({ mergeParams: true }); // ✅ Обязательно

const postController = require('../controllers/postController');

// Все методы работают с topicId из URL
router.get('/', postController.getByTopic);  
router.post('/', postController.create);
router.put('/:id', postController.update);

module.exports = router;
