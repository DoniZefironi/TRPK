const Router = require('express');
const scheduleController = require('../controllers/scheduleController');

const router = new Router();

// Создать расписание
router.post('/', scheduleController.createSchedule);

// Получить все записи расписания
router.get('/', scheduleController.getSchedules);

// Получить запись расписания по ID
router.get('/:id', scheduleController.getScheduleById);

// Обновить запись расписания
router.put('/:id', scheduleController.updateSchedule);

// Удалить запись расписания
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
