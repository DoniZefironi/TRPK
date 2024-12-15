const { Lesson } = require('../models/models'); // Убедитесь, что путь к модели указан правильно
const ApiError = require('../error/ApiError');

class LessonController {
    // Создать урок
    async createLesson(req, res, next) {
        try {
            const { name, id_class, topic_lesson, id_materials } = req.body;

            // Проверяем обязательные поля
            if (!id_class) {
                return next(ApiError.badRequest('Поле id_class обязательно'));
            }

            const newLesson = await Lesson.create({
                name,
                id_class,
                topic_lesson,
                id_materials,
            });

            res.status(201).json(newLesson);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания урока'));
        }
    }

    // Получить все уроки
    async getLessons(req, res, next) {
        try {
            const lessons = await Lesson.findAll();
            res.status(200).json(lessons);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения уроков'));
        }
    }
    // Обновить урок
async updateLesson(req, res, next) {
    try {
        const { id } = req.params;
        const { name, id_class, topic_lesson, id_materials } = req.body;

        // Найти урок по ID
        const lesson = await Lesson.findByPk(id);

        if (!lesson) {
            return next(ApiError.notFound('Урок не найден'));
        }

        // Обновить урок
        await lesson.update({
            name: name || lesson.name,
            id_class: id_class || lesson.id_class,
            topic_lesson: topic_lesson || lesson.topic_lesson,
            id_materials: id_materials || lesson.id_materials,
        });

        res.status(200).json(lesson);
    } catch (error) {
        console.error(error);
        next(ApiError.internal('Ошибка обновления урока'));
    }
}

    // Получить урок по ID
    async getLessonById(req, res, next) {
        try {
            const { id } = req.params;
            const lesson = await Lesson.findByPk(id);

            if (!lesson) {
                return next(ApiError.notFound('Урок не найден'));
            }

            res.status(200).json(lesson);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения урока'));
        }
    }

    // Удалить урок
    async deleteLesson(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Lesson.destroy({ where: { id_lesson: id } });

            if (!deleted) {
                return next(ApiError.notFound('Урок не найден'));
            }

            res.status(200).json({ message: 'Урок успешно удалён' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления урока'));
        }
    }
}

module.exports = new LessonController();
