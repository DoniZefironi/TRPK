const { ForumSection, ForumTopic } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class SectionController {
    // Получение всех разделов с пагинацией и фильтрацией
    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10, type, search } = req.query;
            const offset = (page - 1) * limit;

            // Подготовка условий поиска
            const where = {};
            if (type) where.type = type;
            if (search) {
                where[Op.or] = [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const { count, rows: sections } = await ForumSection.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset,
                order: [['name', 'ASC']],
                include: [{
                    model: ForumTopic,
                    attributes: ['id'],
                    as: 'topics',
                    required: false
                }]
            });

            // Добавляем количество тем к каждому разделу
            const sectionsWithCount = sections.map(section => ({
                ...section.toJSON(),
                topicsCount: section.topics ? section.topics.length : 0
            }));

            return res.json({
                success: true,
                data: sectionsWithCount,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (e) {
            console.error('Ошибка в getAll:', e);
            next(ApiError.internal('Не удалось получить разделы форума'));
        }
    }

    // Создание нового раздела
    async create(req, res, next) {
        try {
            const { name, type, description } = req.body;
            const allowedTypes = ['IoT', 'Electric', 'Informatics'];

            // Валидация
            if (!name || !type) {
                return next(ApiError.badRequest('Не указаны обязательные поля: name и type'));
            }

            if (!allowedTypes.includes(type)) {
                return next(ApiError.badRequest(
                    `Недопустимый тип раздела. Допустимые значения: ${allowedTypes.join(', ')}`
                ));
            }

            // Проверка на дубликат
            const existingSection = await ForumSection.findOne({ where: { name } });
            if (existingSection) {
                return next(ApiError.badRequest('Раздел с таким названием уже существует'));
            }

            const section = await ForumSection.create({
                name,
                type,
                description: description || null
            });

            return res.status(201).json({
                success: true,
                data: section,
                message: 'Раздел успешно создан'
            });
        } catch (e) {
            console.error('Ошибка в create:', e);
            next(ApiError.internal('Не удалось создать раздел'));
        }
    }

    // Получение одного раздела с информацией о темах
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const section = await ForumSection.findByPk(id, {
                include: [{
                    model: ForumTopic,
                    as: 'topics',
                    attributes: ['id', 'title', 'createdAt'],
                    include: [{
                        model: models.User,
                        as: 'author',
                        attributes: ['id_user', 'username', 'avatar']
                    }],
                    order: [['createdAt', 'DESC']],
                    limit: 5
                }]
            });

            if (!section) {
                return next(ApiError.notFound('Раздел не найден'));
            }

            return res.json({
                success: true,
                data: section
            });
        } catch (e) {
            console.error('Ошибка в getOne:', e);
            next(ApiError.internal('Не удалось получить раздел'));
        }
    }

    // Обновление раздела
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const section = await ForumSection.findByPk(id);
            if (!section) {
                return next(ApiError.notFound('Раздел не найден'));
            }

            // Проверка на дубликат названия
            if (name && name !== section.name) {
                const existingSection = await ForumSection.findOne({ 
                    where: { 
                        name,
                        id: { [Op.ne]: id }
                    } 
                });
                if (existingSection) {
                    return next(ApiError.badRequest('Раздел с таким названием уже существует'));
                }
            }

            await section.update({ 
                name: name || section.name,
                description: description || section.description
            });

            return res.json({
                success: true,
                data: section,
                message: 'Раздел успешно обновлен'
            });
        } catch (e) {
            console.error('Ошибка в update:', e);
            next(ApiError.internal('Не удалось обновить раздел'));
        }
    }

    // Удаление раздела
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const section = await ForumSection.findByPk(id);
            
            if (!section) {
                return next(ApiError.notFound('Раздел не найден'));
            }

            // Проверка наличия тем в разделе
            const topicsCount = await ForumTopic.count({ where: { sectionId: id } });
            if (topicsCount > 0) {
                return next(ApiError.badRequest('Невозможно удалить раздел, так как в нем есть темы'));
            }

            await section.destroy();
            return res.json({
                success: true,
                message: 'Раздел успешно удален'
            });
        } catch (e) {
            console.error('Ошибка в delete:', e);
            next(ApiError.internal('Не удалось удалить раздел'));
        }
    }
}

module.exports = new SectionController();