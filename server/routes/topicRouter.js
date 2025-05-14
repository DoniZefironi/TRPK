const express = require('express');
const router = express.Router({ mergeParams: true });
const topicController = require('../controllers/topicController');
const postRouter = require('./postRouter');

// 🔧 Правильные маршруты
router.get('/', topicController.getBySection); // /sections/:sectionId/topics
router.post('/', topicController.create);      // /sections/:sectionId/topics
router.get('/:id', topicController.getOne);    // /sections/:sectionId/topics/:id
router.put('/:id', topicController.update);    // /sections/:sectionId/topics/:id
router.delete('/:id', topicController.delete); // /sections/:sectionId/topics/:id

// Посты как вложенный маршрут
router.use('/:topicId/posts', postRouter);

module.exports = router;
