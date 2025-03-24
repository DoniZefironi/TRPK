const { MaterialsLibrary } = require('../models/models');
const ApiError = require('../error/ApiError');

class MaterialController {
    async createMaterial(req, res, next) {
        try {
            const { topic_materials } = req.body;

            if (!topic_materials) {
                return next(ApiError.badRequest('Поле topic_materials обязательно'));
            }

            const newMaterial = await MaterialsLibrary.create({ topic_materials });

            res.status(201).json(newMaterial);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания материала'));
        }
    }

    async getAllMaterials(req, res, next) {
        try {
            const materials = await MaterialsLibrary.findAll();
            res.status(200).json(materials);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения материалов'));
        }
    }

    async getMaterialById(req, res, next) {
        try {
            const { id } = req.params;
            const material = await MaterialsLibrary.findByPk(id);

            if (!material) {
                return next(ApiError.notFound('Материал с указанным ID не найден'));
            }

            res.status(200).json(material);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения материала'));
        }
    }

    async deleteMaterial(req, res, next) {
        try {
            const { id } = req.params;

            const material = await MaterialsLibrary.findByPk(id);
            if (!material) {
                return next(ApiError.notFound('Материал с указанным ID не найден'));
            }

            await material.destroy();
            res.status(200).json({ message: 'Материал успешно удален' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления материала'));
        }
    }
}

module.exports = new MaterialController();
