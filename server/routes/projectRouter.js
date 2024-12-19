const Router = require('express');
const router = new Router();
const projectController = require('../controllers/projectController');

// Маршруты для проектов IoT
router.post('/', projectController.createProject); // Создать проект
router.get('/', projectController.getProjects); // Получить все проекты
router.get('/:id', projectController.getProjectById); // Получить проект по ID
router.put('/:id', projectController.updateProject); // Обновить проект
router.delete('/:id', projectController.deleteProject); // Удалить проект

module.exports = router;