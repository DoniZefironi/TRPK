const { Forum } = require('../models/models'); 
const ApiError = require('../error/ApiError');

class ForumController {
    // Создать форум
    async createForum(req, res, next) {
        try {
            const { rules, section } = req.body;

            if (!section) {
                return next(ApiError.badRequest('Поле section обязательно'));
            }

            const newForum = await Forum.create({ rules, section });

            res.status(201).json(newForum);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания форума'));
        }
    }

    // Получить все форумы
    async getForums(req, res, next) {
        try {
            const forums = await Forum.findAll();
            res.status(200).json(forums);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения форумов'));
        }
    }

    // Получить форум по ID
    async getForumById(req, res, next) {
        try {
            const { id } = req.params;
            const forum = await Forum.findByPk(id);

            if (!forum) {
                return next(ApiError.notFound('Форум не найден'));
            }

            res.status(200).json(forum);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения форума'));
        }
    }

    // Обновить форум
    async updateForum(req, res, next) {
        try {
            const { id } = req.params;
            const { rules, section } = req.body;

            const forum = await Forum.findByPk(id);

            if (!forum) {
                return next(ApiError.notFound('Форум не найден'));
            }

            await forum.update({
                rules: rules || forum.rules,
                section: section || forum.section,
            });

            res.status(200).json(forum);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления форума'));
        }
    }

    // Удалить форум
    async deleteForum(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Forum.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Форум не найден'));
            }

            res.status(200).json({ message: 'Форум успешно удалён' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления форума'));
        }
    }
}

module.exports = new ForumController();
