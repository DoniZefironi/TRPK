const Router = require('express');
const scheduleController = require('../../controllers/ControllersForElectric/scheduleElectricController');
const router = new Router();

router.post('/', scheduleController.createSchedule);
router.get('/', scheduleController.getSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
