const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для создания, обновления и удаления

// Получение всех разделов с пагинацией и фильтрацией
router.get('/', sectionController.getAll);

// Создание нового раздела (требуется авторизация)
router.post('/', sectionController.create);

// Получение конкретного раздела
router.get('/:id', sectionController.getOne);

// Обновление раздела (требуется авторизация)
router.put('/:id', sectionController.update);

// Удаление раздела (требуется авторизация)
router.delete('/:id', sectionController.delete);

module.exports = router;
