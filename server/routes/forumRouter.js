const Router = require('express');
const forumController = require('../controllers/forumController'); // Убедитесь, что путь верный
const router = new Router();

router.get('/', forumController.getForums);  // ← здесь может быть проблема
router.post('/', forumController.createForum);

module.exports = router;
