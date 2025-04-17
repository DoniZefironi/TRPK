const Router = require('express');
const materialsController = require('../controllers/materialController');
const router = Router();

router.post('/', materialsController.createMaterial);  // Добавление материала
router.get('/', materialsController.getAllMaterials); // Чтение всех материалов
router.put('/:id', materialsController.updateMaterial); // Обновление материала
router.delete('/:id', materialsController.deleteMaterial); // Удаление материала

module.exports = router;
