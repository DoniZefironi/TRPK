const Router = require('express');
const careerController = require('../controllers/careerController');
const router = new Router();

router.post('/', careerController.createCareerGuidance); // Создать карьерное руководство
router.get('/', careerController.getCareerGuidances); // Получить все записи
router.get('/:id', careerController.getCareerGuidanceById); // Получить запись по ID
router.put('/:id', careerController.updateCareerGuidance); // Обновить запись
router.delete('/:id', careerController.deleteCareerGuidance); // Удалить запись

module.exports = router;