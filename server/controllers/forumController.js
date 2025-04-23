const { Forum, ForumSection, ForumTopic } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class ForumController {
    // Создание нового форума
    async createForum(req, res, next) {
        try {
            const { rules, section, description } = req.body;
            
            // Валидация входных данных
            if (!section) {
                return next(ApiError.badRequest('Название раздела обязательно'));
            }

            // Проверка на дубликат
            const existingForum = await Forum.findOne({ where: { section } });
            if (existingForum) {
                return next(ApiError.badRequest('Форум с таким названием раздела уже существует'));
            }

            const newForum = await Forum.create({ 
                rules: rules || null, 
                section,
                description: description || null
            });

            return res.status(201).json({
                success: true,
                data: newForum,
                message: 'Форум успешно создан'
            });
        } catch (error) {
            console.error('Ошибка при создании форума:', error);
            next(ApiError.internal('Не удалось создать форум'));
        }
    }

    // Получение списка форумов с пагинацией
    async getForums(req, res, next) {
        try {
            let { page = 1, limit = 10, search } = req.query;
            const offset = (page - 1) * limit;

            // Условия поиска
            const where = {};
            if (search) {
                where[Op.or] = [
                    { section: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const { count, rows: forums } = await Forum.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset,
                order: [['section', 'ASC']],
                include: [{
                    model: ForumTopic,
                    as: 'topics',
                    attributes: ['id'],
                    required: false
                }]
            });

            // Добавляем количество тем к каждому форуму
            const forumsWithStats = forums.map(forum => ({
                ...forum.get({ plain: true }),
                topicsCount: forum.topics?.length || 0
            }));

            return res.json({
                success: true,
                data: forumsWithStats,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (error) {
            console.error('Ошибка при получении форумов:', error);
            next(ApiError.internal('Не удалось получить список форумов'));
        }
    }

    // Получение конкретного форума
    async getForumById(req, res, next) {
        try {
            const { id } = req.params;
            
            const forum = await Forum.findByPk(id, {
                include: [{
                    model: ForumSection,
                    as: 'sections',
                    include: [{
                        model: ForumTopic,
                        as: 'topics',
                        attributes: ['id', 'title', 'createdAt'],
                        required: false
                    }]
                }]
            });

            if (!forum) {
                return next(ApiError.notFound('Форум не найден'));
            }

            return res.json({
                success: true,
                data: forum
            });
        } catch (error) {
            console.error('Ошибка при получении форума:', error);
            next(ApiError.internal('Не удалось получить информацию о форуме'));
        }
    }

    // Обновление форума
    async updateForum(req, res, next) {
        try {
            const { id } = req.params;
            const { rules, description } = req.body;
            
            const forum = await Forum.findByPk(id);
            if (!forum) {
                return next(ApiError.notFound('Форум не найден'));
            }

            await forum.update({ 
                rules: rules || forum.rules,
                description: description || forum.description
            });

            return res.json({
                success: true,
                data: forum,
                message: 'Форум успешно обновлен'
            });
        } catch (error) {
            console.error('Ошибка при обновлении форума:', error);
            next(ApiError.internal('Не удалось обновить форум'));
        }
    }

    // Удаление форума
    async deleteForum(req, res, next) {
        try {
            const { id } = req.params;
            
            const forum = await Forum.findByPk(id, {
                include: [{
                    model: ForumSection,
                    as: 'sections',
                    required: false
                }]
            });

            if (!forum) {
                return next(ApiError.notFound('Форум не найден'));
            }

            // Проверка наличия разделов
            if (forum.sections?.length > 0) {
                return next(ApiError.badRequest('Невозможно удалить форум, так как в нем есть разделы'));
            }

            await forum.destroy();
            return res.json({
                success: true,
                message: 'Форум успешно удален'
            });
        } catch (error) {
            console.error('Ошибка при удалении форума:', error);
            next(ApiError.internal('Не удалось удалить форум'));
        }
    }
}

module.exports = new ForumController();