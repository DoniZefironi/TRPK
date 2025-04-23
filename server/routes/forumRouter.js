const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для создания, обновления и удаления

// Получение списка всех форумов с пагинацией
router.get('/', forumController.getForums);

// Создание нового форума (требуется авторизация)
router.post('/', forumController.createForum);

// Получение конкретного форума по ID
router.get('/:id', forumController.getForumById);

// Обновление форума (требуется авторизация)
router.put('/:id', authMiddleware, forumController.updateForum);

// Удаление форума (требуется авторизация)
router.delete('/:id', authMiddleware, forumController.deleteForum);

module.exports = router;
