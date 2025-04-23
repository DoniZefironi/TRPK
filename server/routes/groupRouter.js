const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для создания, обновления и удаления групп

// Получение всех групп по курсу с пагинацией
router.get('/:course', groupController.getAllGroups);

// Получение конкретной группы по ID
router.get('/:course/:id', groupController.getGroup);

// Создание новой группы (требуется авторизация)
router.post('/', groupController.createGroup);

// Обновление группы (требуется авторизация)
router.put('/:course/:id', groupController.updateGroup);

// Удаление группы (требуется авторизация)
router.delete('/:course/:id', groupController.deleteGroup);

// Добавление участника в группу (требуется авторизация)
router.post('/:course/:id/members', groupController.addMember);

// Получение списка участников группы
router.get('/:course/:id/members', groupController.getMembers);

// Обновление роли участника (требуется авторизация)
router.put('/:course/:id/members/:userId', groupController.updateMember);

// Удаление участника из группы (требуется авторизация)
router.delete('/:course/:id/members/:userId', groupController.removeMember);

module.exports = router;
