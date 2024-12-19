const { ForumSectionIoT } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class SectionController {
    // Создать раздел форума
    async createSection(req, res, next) {
        try {
            const { subsections, posts, moderators } = req.body;

            // Проверка обязательных полей
            if (!subsections) {
                return next(ApiError.badRequest('Поле subsections обязательно'));
            }

            const newSection = await ForumSectionIoT.create({
                subsections,
                posts,
                moderators,
            });

            res.status(201).json(newSection);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания раздела форума'));
        }
    }

    // Получить все разделы форума
    async getSections(req, res, next) {
        try {
            const sections = await ForumSectionIoT.findAll();
            res.status(200).json(sections);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения разделов форума'));
        }
    }

    // Получить раздел форума по ID
    async getSectionById(req, res, next) {
        try {
            const { id } = req.params;
            const section = await ForumSectionIoT.findByPk(id);

            if (!section) {
                return next(ApiError.notFound('Раздел форума не найден'));
            }

            res.status(200).json(section);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения раздела форума'));
        }
    }

    // Обновить раздел форума
    async updateSection(req, res, next) {
        try {
            const { id } = req.params;
            const { subsections, posts, moderators } = req.body;

            const section = await ForumSectionIoT.findByPk(id);

            if (!section) {
                return next(ApiError.notFound('Раздел форума не найден'));
            }

            await section.update({
                subsections: subsections || section.subsections,
                posts: posts || section.posts,
                moderators: moderators || section.moderators,
            });

            res.status(200).json(section);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления раздела форума'));
        }
    }

    // Удалить раздел форума
    async deleteSection(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await ForumSectionIoT.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Раздел форума не найден'));
            }

            res.status(200).json({ message: 'Раздел форума успешно удален' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления раздела форума'));
        }
    }
}

module.exports = new SectionController();