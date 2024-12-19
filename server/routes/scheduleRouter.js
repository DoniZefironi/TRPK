const Router = require('express');
const router = new Router();
const scheduleController = require('../controllers/scheduleController');

// Маршруты для расписания IoT
router.post('/', scheduleController.createSchedule); // Создать расписание
router.get('/', scheduleController.getSchedules); // Получить все расписания
router.get('/:id', scheduleController.getScheduleById); // Получить расписание по ID
router.put('/:id', scheduleController.updateSchedule); // Обновить расписание
router.delete('/:id', scheduleController.deleteSchedule); // Удалить расписание

module.exports = router;