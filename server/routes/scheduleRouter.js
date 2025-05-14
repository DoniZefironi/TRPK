const Router = require('express');
const scheduleController = require('../controllers/scheduleController');
const router = new Router();

router.post('/:course', scheduleController.createScheduleItem);
router.get('/:course', scheduleController.getSchedule);
router.get('/:course/group/:id_group', scheduleController.getGroupSchedule);
router.get('/:course/:id', scheduleController.getScheduleItem);
router.put('/:course/:id', scheduleController.updateScheduleItem);
router.delete('/:course/:id', scheduleController.deleteScheduleItem);
router.get('/:course/date', scheduleController.getScheduleByDate);

module.exports = router;