const Router = require('express');
const router = new Router();
const careerGuidanceController = require('../controllers/careerGuidanceController');
const authMiddleware = require('../middleware/authMiddleware');

// Создание записи (доступно преподавателям и администраторам)
router.post('/', 
    careerGuidanceController.create
);

// Получение всех записей (доступно всем)
router.get('/', careerGuidanceController.getAll);

// Получение записей по дате (доступно всем)
router.get('/by-date', careerGuidanceController.getByDate);

// Получение конкретной записи (доступно всем)
router.get('/:id', careerGuidanceController.getOne);

// Обновление записи (доступно преподавателям и администраторам)
router.put('/:id', 
    careerGuidanceController.update
);

// Удаление записи (доступно администраторам)
router.delete('/:id', 
    careerGuidanceController.delete
);

module.exports = router;