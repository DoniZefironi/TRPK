const Router = require('express');
const materialController = require('../controllers/materialController');
const router = new Router();

router.post('/', materialController.createMaterial); // Создать материал
router.get('/', materialController.getAllMaterials); // Получить все материалы
router.get('/:id', materialController.getMaterialById); // Получить материал по ID
router.delete('/:id', materialController.deleteMaterial); // Удалить материал

module.exports = router;
