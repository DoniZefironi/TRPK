const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Создание проекта
router.post('/', projectController.createProject);

// Получение всех проектов
router.get('/', projectController.getProjects);

// Получение проекта по id
router.get('/:id', projectController.getProjectById);

// Обновление проекта
router.put('/:id', projectController.updateProject);

// Удаление проекта
router.delete('/:id', projectController.deleteProject);

module.exports = router;
