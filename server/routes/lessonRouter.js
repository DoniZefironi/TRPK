const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.post('/:course', lessonController.createLesson); 
router.get('/:course', lessonController.getLessons); 
router.put('/:course/:id', lessonController.updateLesson);
router.delete('/:course/:id', lessonController.deleteLesson); 

module.exports = router;
