const { Classes } = require('../models/models'); // Убедитесь, что путь к модели указан правильно
const ApiError = require('../error/ApiError');

class ClassesController {
    // Создать урок
    async createClasses(req, res, next) {
        try {
            const { name, id_group, topic_classes, id_materials } = req.body;

            // Проверяем обязательные поля
            if (!id_class) {
                return next(ApiError.badRequest('Поле id_class обязательно'));
            }

            const newClasses = await Classes.create({
                name,
                id_group,
                topic_classes,
                id_materials,
            });

            res.status(201).json(newClasses);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания урока'));
        }
    }

    // Получить все уроки
    async getClasses(req, res, next) {
        try {
            const classes = await Classes.findAll();
            res.status(200).json(classes);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения уроков'));
        }
    }
    // Обновить урок
async updateClasses(req, res, next) {
    try {
        const { id } = req.params;
        const { name, id_class, topic_classes, id_materials } = req.body;

        // Найти урок по ID
        const classes = await Classes.findByPk(id);

        if (!classes) {
            return next(ApiError.notFound('Урок не найден'));
        }

        // Обновить урок
        await classes.update({
            name: name || classes.name,
            id_class: id_class || classes.id_class,
            topic_classes: topic_classes || classes.topic_classes,
            id_materials: id_materials || classes.id_materials,
        });

        res.status(200).json(classes);
    } catch (error) {
        console.error(error);
        next(ApiError.internal('Ошибка обновления урока'));
    }
}

    // Получить урок по ID
    async getClassesById(req, res, next) {
        try {
            const { id } = req.params;
            const classes = await Classes.findByPk(id);

            if (!classes) {
                return next(ApiError.notFound('Урок не найден'));
            }

            res.status(200).json(classes);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения урока'));
        }
    }

    // Удалить урок
    async deleteClasses(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Classes.destroy({ where: { topic_classes: id } });

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

module.exports = new ClassesController();
