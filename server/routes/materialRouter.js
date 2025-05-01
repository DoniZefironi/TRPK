const express = require('express');
const router = express.Router();
const materialsController = require('../controllers/materialController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для создания, обновления и удаления

router.get('/', materialsController.getAllMaterials);

router.get('/topics', materialsController.getMaterialTopics);

router.get('/:id_material', materialsController.getMaterialById);

router.post('/', materialsController.createMaterial);

router.put('/:id_material', materialsController.updateMaterial);

router.delete('/:id_material', materialsController.deleteMaterial);

module.exports = router;
