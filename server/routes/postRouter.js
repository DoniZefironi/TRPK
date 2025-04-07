const Router = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.get('/topics/:topicId/posts', postController.getByTopic);
router.post('/topics/:topicId/posts', authMiddleware, postController.create);

module.exports = router;
