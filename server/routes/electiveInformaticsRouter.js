const Router = require('express');
const router = new Router();
const electiveController = require('../controllers/electiveInformaticsController');
const authMiddleware = require('../middleware/authMiddleware');

// Создание факультатива (доступно преподавателям)
router.post('/', electiveController.create);

// Получение списка факультативов (доступно всем)
router.get('/', electiveController.getAll);

// Получение информации о факультативе (доступно всем)
router.get('/:id', electiveController.getOne);

// Обновление факультатива (доступно преподавателям)
router.put('/:id', electiveController.update);

// Удаление факультатива (доступно преподавателям)
router.delete('/:id', electiveController.delete);

// Добавление участника в факультатив (доступно преподавателям)
router.post('/:id/participants', electiveController.addParticipant);

module.exports = router;