const express = require('express');
const router = express.Router();
const materialsController = require('../controllers/materialController');
const authMiddleware = require('../middleware/authMiddleware'); // Авторизация для создания, обновления и удаления

router.get('/', materialsController.getAllMaterials);

router.get('/topics', materialsController.getMaterialTopics);

router.get('/:id', materialsController.getMaterialById);

router.post('/', materialsController.createMaterial);

router.put('/:id', materialsController.updateMaterial);

router.delete('/:id', materialsController.deleteMaterial);

module.exports = router;
