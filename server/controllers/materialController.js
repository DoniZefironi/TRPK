const { MaterialsLibrary } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class MaterialsController {
    /**
     * Добавление нового материала
     */
    async createMaterial(req, res, next) {
        try {
            const { topic_materials, title, description, file_url } = req.body;

            // Валидация обязательных полей
            if (!topic_materials || !title) {
                return next(ApiError.badRequest('Не указаны обязательные поля: topic_materials и title'));
            }

            // Проверка на дубликат по названию
            const existingMaterial = await MaterialsLibrary.findOne({ 
                where: { title } 
            });
            
            if (existingMaterial) {
                return next(ApiError.badRequest('Материал с таким названием уже существует'));
            }

            const newMaterial = await MaterialsLibrary.create({ 
                topic_materials, 
                title, 
                description, 
                file_url 
            });
            
            return res.status(201).json({
                success: true,
                data: newMaterial,
                message: 'Материал успешно создан'
            });
        } catch (error) {
            console.error('Ошибка в createMaterial:', error);
            next(ApiError.internal('Не удалось создать материал'));
        }
    }

    /**
     * Получение всех материалов с пагинацией и фильтрацией
     */
    async getAllMaterials(req, res, next) {
        try {
            const { page = 1, limit = 10, search, topic } = req.query;
            const offset = (page - 1) * limit;

            // Подготовка условий поиска
            const where = {};
            
            if (search) {
                where[Op.or] = [
                    { title: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } }
                ];
            }
            
            if (topic) {
                where.topic_materials = topic;
            }

            const { count, rows } = await MaterialsLibrary.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['upload_date', 'DESC']]
            });

            return res.json({
                success: true,
                data: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (error) {
            console.error('Ошибка в getAllMaterials:', error);
            next(ApiError.internal('Не удалось получить материалы'));
        }
    }

    /**
     * Получение материала по ID
     */
    async getMaterialById(req, res, next) {
        try {
            const { id } = req.params;

            const material = await MaterialsLibrary.findByPk(id);
            
            if (!material) {
                return next(ApiError.notFound('Материал не найден'));
            }

            return res.json({
                success: true,
                data: material
            });
        } catch (error) {
            console.error('Ошибка в getMaterialById:', error);
            next(ApiError.internal('Не удалось получить материал'));
        }
    }

    /**
     * Обновление материала
     */
    async updateMaterial(req, res, next) {
        try {
            const { id } = req.params;
            const { topic_materials, title, description, file_url } = req.body;

            const material = await MaterialsLibrary.findByPk(id);
            
            if (!material) {
                return next(ApiError.notFound('Материал не найден'));
            }

            // Проверка на дубликат названия (исключая текущий материал)
            if (title && title !== material.title) {
                const existingMaterial = await MaterialsLibrary.findOne({ 
                    where: { 
                        title,
                        id_material: { [Op.ne]: id }
                    } 
                });
                
                if (existingMaterial) {
                    return next(ApiError.badRequest('Материал с таким названием уже существует'));
                }
            }

            await material.update({ 
                topic_materials, 
                title, 
                description, 
                file_url 
            });

            return res.json({
                success: true,
                data: material,
                message: 'Материал успешно обновлен'
            });
        } catch (error) {
            console.error('Ошибка в updateMaterial:', error);
            next(ApiError.internal('Не удалось обновить материал'));
        }
    }

    /**
     * Удаление материала
     */
    async deleteMaterial(req, res, next) {
        try {
            const { id } = req.params;

            const material = await MaterialsLibrary.findByPk(id);
            
            if (!material) {
                return next(ApiError.notFound('Материал не найден'));
            }

            await material.destroy();

            return res.json({
                success: true,
                message: 'Материал успешно удален'
            });
        } catch (error) {
            console.error('Ошибка в deleteMaterial:', error);
            next(ApiError.internal('Не удалось удалить материал'));
        }
    }

    /**
     * Получение списка уникальных тем материалов
     */
    async getMaterialTopics(req, res, next) {
        try {
            const topics = await MaterialsLibrary.findAll({
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col('topic_materials')), 'topic']
                ],
                raw: true
            });

            return res.json({
                success: true,
                data: topics.map(t => t.topic)
            });
        } catch (error) {
            console.error('Ошибка в getMaterialTopics:', error);
            next(ApiError.internal('Не удалось получить список тем'));
        }
    }
}

module.exports = new MaterialsController();