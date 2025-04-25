const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/', forumController.getForums);

router.post('/', forumController.createForum);

router.get('/:id', forumController.getForumById);

router.put('/:id', forumController.updateForum);

router.delete('/:id', forumController.deleteForum);

module.exports = router;
