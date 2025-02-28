const Router = require('express');
const forumSectionController = require('../../controllers/ControllersForElectric/forumSectionElectricController');
const router = new Router();

router.post('/', forumSectionController.createForumSection);
router.get('/', forumSectionController.getForumSections);
router.get('/:id', forumSectionController.getForumSectionById);
router.delete('/:id', forumSectionController.deleteForumSection);
router.put('/:id', forumSectionController.updateForumSection);

module.exports = router;
