const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/:course', projectController.createProject); // Создание проекта
router.get('/:course', projectController.getProjects); // Получение всех проектов
router.put('/:course/:id', projectController.updateProject); // Обновление проекта
router.delete('/:course/:id', projectController.deleteProject); // Удаление проекта

module.exports = router;
