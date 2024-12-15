const { Class } = require('../models/models'); // Убедитесь, что путь правильный
const ApiError = require('../error/ApiError');

class ClassController {
    // Создать класс
    async createClass(req, res, next) {
        try {
            const { id_user, name_class, list_user } = req.body;

            // Проверяем обязательные поля
            if (!id_user) {
                return next(ApiError.badRequest('Поле id_user обязательно'));
            }

            const newClass = await Class.create({
                id_user,
                name_class,
                list_user,
            });

            res.status(201).json(newClass);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания класса'));
        }
    }

    // Получить все классы
    async getAllClasses(req, res, next) {
        try {
            const classes = await Class.findAll();
            res.json(classes);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения списка классов'));
        }
    }

    // Получить класс по id
    async getClassById(req, res, next) {
        try {
            const { id } = req.params;
            const classItem = await Class.findByPk(id);

            if (!classItem) {
                return next(ApiError.notFound(`Класс с id ${id} не найден`));
            }

            res.json(classItem);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения класса'));
        }
    }

    // Обновить класс
    async updateClass(req, res, next) {
        try {
            const { id } = req.params;
            const { id_user, name_class, list_user } = req.body;

            const classItem = await Class.findByPk(id);

            if (!classItem) {
                return next(ApiError.notFound(`Класс с id ${id} не найден`));
            }

            await classItem.update({
                id_user,
                name_class,
                list_user,
            });

            res.json(classItem);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления класса'));
        }
    }

    // Удалить класс
    async deleteClass(req, res, next) {
        try {
            const { id } = req.params;

            const classItem = await Class.findByPk(id);

            if (!classItem) {
                return next(ApiError.notFound(`Класс с id ${id} не найден`));
            }

            await classItem.destroy();
            res.json({ message: `Класс с id ${id} удален` });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления класса'));
        }
    }
}

module.exports = new ClassController();
