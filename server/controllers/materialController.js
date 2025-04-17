const { MaterialsLibrary } = require('../models/models');
const ApiError = require('../error/ApiError');

class MaterialsController {

    // Добавление нового материала
    async createMaterial(req, res, next) {
        try {
            const { topic_materials, title, description, file_url } = req.body;

            if (!topic_materials || !title) {
                return next(ApiError.badRequest('Поля topic_materials и title обязательны'));
            }

            const newMaterial = await MaterialsLibrary.create({ topic_materials, title, description, file_url });
            res.status(201).json(newMaterial);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания материала'));
        }
    }

    // Получение всех материалов
    async getAllMaterials(req, res, next) {
        try {
            const materials = await MaterialsLibrary.findAll();
            res.status(200).json(materials);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения материалов'));
        }
    }

    // Обновление материала
    async updateMaterial(req, res, next) {
        try {
            const { id } = req.params;
            const { topic_materials, title, description, file_url } = req.body;
    
            const material = await MaterialsLibrary.findByPk(id);
            if (!material) {
                return next(ApiError.notFound('Материал с указанным ID не найден'));
            }

            await material.update({ topic_materials, title, description, file_url });
            res.status(200).json({ message: 'Материал обновлен успешно', material });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления материала'));
        }
    }

    // Удаление материала
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

module.exports = new MaterialsController();
