const Router = require('express');
const router = new Router();
const applicationController = require('../controllers/applicationController');

// Маршруты для заявок на стажировку
router.post('/', applicationController.createApplication); // Создать заявку
router.get('/', applicationController.getApplications); // Получить все заявки
router.get('/:id', applicationController.getApplicationById); // Получить заявку по ID
router.put('/:id', applicationController.updateApplication); // Обновить заявку
router.delete('/:id', applicationController.deleteApplication); // Удалить заявку

module.exports = router;