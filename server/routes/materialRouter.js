const express = require('express');
const router = express.Router();
const materialsController = require('../controllers/materialController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для создания, обновления и удаления

// Получение всех материалов с фильтрацией и пагинацией
router.get('/', materialsController.getAllMaterials);

// Получение списка уникальных тем материалов
router.get('/topics', materialsController.getMaterialTopics);

// Получение конкретного материала по ID
router.get('/:id', materialsController.getMaterialById);

// Создание нового материала (требуется авторизация)
router.post('/', materialsController.createMaterial);

// Обновление материала (требуется авторизация)
router.put('/:id', materialsController.updateMaterial);

// Удаление материала (требуется авторизация)
router.delete('/:id', materialsController.deleteMaterial);

module.exports = router;
