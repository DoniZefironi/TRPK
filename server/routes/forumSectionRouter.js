const Router = require('express');
const forumSectionController = require('../controllers/forumSectionController');

const router = new Router();

// Создать секцию форума
router.post('/', forumSectionController.createForumSection);

// Получить все секции форума
router.get('/', forumSectionController.getForumSections);

// Получить секцию форума по ID
router.get('/:id', forumSectionController.getForumSectionById);

// Удалить секцию форума
router.delete('/:id', forumSectionController.deleteForumSection);

// Обновить секцию форума
router.put('/:id', forumSectionController.updateForumSection);

module.exports = router;
