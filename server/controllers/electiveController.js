const { Elective } = require('../models/models'); // Проверьте правильность пути
const ApiError = require('../error/ApiError');

class ElectiveController {
    // Создать электив
    async createElective(req, res, next) {
        try {
            const { id_user, name, topic_elective } = req.body;

            // Проверка обязательных полей
            if (!name || !topic_elective) {
                return next(ApiError.badRequest('Поля name и topic_elective обязательны'));
            }

            const newElective = await Elective.create({
                id_user,
                name,
                topic_elective,
            });

            res.status(201).json(newElective);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания электива'));
        }
    }

    // Получить все элективы
    async getElectives(req, res, next) {
        try {
            const electives = await Elective.findAll();
            res.status(200).json(electives);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения элективов'));
        }
    }

    // Получить электив по ID
    async getElectiveById(req, res, next) {
        try {
            const { id } = req.params;
            const elective = await Elective.findByPk(id);

            if (!elective) {
                return next(ApiError.notFound('Электив не найден'));
            }

            res.status(200).json(elective);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения электива'));
        }
    }

    // Обновить электив
    async updateElective(req, res, next) {
        try {
            const { id } = req.params;
            const { id_user, name, topic_elective } = req.body;

            const elective = await Elective.findByPk(id);

            if (!elective) {
                return next(ApiError.notFound('Электив не найден'));
            }

            await elective.update({
                id_user: id_user !== undefined ? id_user : elective.id_user,
                name: name || elective.name,
                topic_elective: topic_elective || elective.topic_elective,
            });

            res.status(200).json(elective);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления электива'));
        }
    }

    // Удалить электив
    async deleteElective(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Elective.destroy({ where: { id: id } });

            if (!deleted) {
                return next(ApiError.notFound('Электив не найден'));
            }

            res.status(200).json({ message: 'Электив успешно удален' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления электива'));
        }
    }
}

module.exports = new ElectiveController();
