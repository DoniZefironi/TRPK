const { ForumSection } = require('../models/models'); // Убедитесь, что путь к модели указан верно
const ApiError = require('../error/ApiError');

class ForumSectionController {
    // Создать секцию форума
    async createForumSection(req, res, next) {
        try {
            const { subsections, topic_subsections, moderators, id_user, name } = req.body;

            // Проверяем обязательные поля
            if (!name) {
                return next(ApiError.badRequest('Поле name обязательно'));
            }

            const newForumSection = await ForumSection.create({
                subsections,
                topic_subsections,
                moderators,
                id_user,
                name,
            });

            res.status(201).json(newForumSection);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания секции форума'));
        }
    }

    // Получить все секции форума
    async getForumSections(req, res, next) {
        try {
            const forumSections = await ForumSection.findAll();
            res.status(200).json(forumSections);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения секций форума'));
        }
    }

    // Получить секцию форума по ID
    async getForumSectionById(req, res, next) {
        try {
            const { id } = req.params;
            const forumSection = await ForumSection.findByPk(id);

            if (!forumSection) {
                return next(ApiError.notFound('Секция форума не найдена'));
            }

            res.status(200).json(forumSection);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения секции форума'));
        }
    }

    // Удалить секцию форума
    async deleteForumSection(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await ForumSection.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Секция форума не найдена'));
            }

            res.status(200).json({ message: 'Секция форума успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления секции форума'));
        }
    }

    // Обновить секцию форума
    async updateForumSection(req, res, next) {
        try {
            const { id } = req.params;
            const { subsections, topic_subsections, moderators, id_user, name } = req.body;

            const forumSection = await ForumSection.findByPk(id);

            if (!forumSection) {
                return next(ApiError.notFound('Секция форума не найдена'));
            }

            await forumSection.update({
                subsections: subsections || forumSection.subsections,
                topic_subsections: topic_subsections || forumSection.topic_subsections,
                moderators: moderators || forumSection.moderators,
                id_user: id_user || forumSection.id_user,
                name: name || forumSection.name,
            });

            res.status(200).json(forumSection);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления секции форума'));
        }
    }
}

module.exports = new ForumSectionController();
