const Router = require('express');
const router = new Router();
const sectionController = require('../controllers/sectionController');

// Маршруты для разделов форума
router.post('/', sectionController.createSection); // Создать раздел форума
router.get('/', sectionController.getSections); // Получить все разделы
router.get('/:id', sectionController.getSectionById); // Получить раздел по ID
router.put('/:id', sectionController.updateSection); // Обновить раздел
router.delete('/:id', sectionController.deleteSection); // Удалить раздел

module.exports = router;