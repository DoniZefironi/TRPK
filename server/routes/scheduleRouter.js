const Router = require('express');
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

// Создание записи в расписании (требует аутентификации и прав преподавателя/админа)
router.post('/:course', 
    scheduleController.createScheduleItem
);

// Получение всего расписания (доступно всем)
router.get('/:course', scheduleController.getSchedule);

// Получение конкретной записи (доступно всем)
router.get('/:course/:id', scheduleController.getScheduleItem);

// Обновление записи (требует аутентификации и прав преподавателя/админа)
router.put('/:course/:id', 
    scheduleController.updateScheduleItem
);

// Удаление записи (требует аутентификации и прав преподавателя/админа)
router.delete('/:course/:id', 
    scheduleController.deleteScheduleItem
);

// Получение расписания на конкретную дату (доступно всем)
router.get('/:course/date', scheduleController.getScheduleByDate);

module.exports = router;