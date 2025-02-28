const Router = require('express');
const forumController = require('../controllers/forumController');

const router = new Router();

router.post('/', forumController.createForum);
router.get('/', forumController.getForums);
router.get('/:id', forumController.getForumById);
router.put('/:id', forumController.updateForum);
router.delete('/:id', forumController.deleteForum);

module.exports = router;
