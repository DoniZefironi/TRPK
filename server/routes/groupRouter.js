const Router = require('express');
const router = new Router();
const groupController = require('../controllers/groupController');

router.post('/', groupController.createGroup);           // Создать группу
router.get('/', groupController.getGroups);              // Получить все группы
router.get('/:id', groupController.getGroupById);        // Получить группу по ID
router.put('/:id', groupController.updateGroup);         // Обновить группу
router.delete('/:id', groupController.deleteGroup);      // Удалить группу

module.exports = router;