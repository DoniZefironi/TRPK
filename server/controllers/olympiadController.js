const { Olympiad } = require('../models/models'); // Проверьте правильность пути
const ApiError = require('../error/ApiError');

class OlympiadController {
    // Создать олимпиаду
    async createOlympiad(req, res, next) {
        try {
            const { id_user, name, topic_olympiads, date } = req.body;

            // Проверка обязательных полей
            if (!name || !topic_olympiads || !date) {
                return next(ApiError.badRequest('Поля name, topic_olympiads и date обязательны'));
            }

            const newOlympiad = await Olympiad.create({
                id_user,
                name,
                topic_olympiads,
                date,
            });

            res.status(201).json(newOlympiad);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания олимпиады'));
        }
    }

    // Получить все олимпиады
    async getOlympiads(req, res, next) {
        try {
            const olympiads = await Olympiad.findAll();
            res.status(200).json(olympiads);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения олимпиад'));
        }
    }

    // Получить олимпиаду по ID
    async getOlympiadById(req, res, next) {
        try {
            const { id } = req.params;
            const olympiad = await Olympiad.findByPk(id);

            if (!olympiad) {
                return next(ApiError.notFound('Олимпиада не найдена'));
            }

            res.status(200).json(olympiad);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения олимпиады'));
        }
    }

    // Обновить олимпиаду
    async updateOlympiad(req, res, next) {
        try {
            const { id } = req.params;
            const { id_user, name, topic_olympiads, date } = req.body;

            const olympiad = await Olympiad.findByPk(id);

            if (!olympiad) {
                return next(ApiError.notFound('Олимпиада не найдена'));
            }

            await olympiad.update({
                id_user: id_user !== undefined ? id_user : olympiad.id_user,
                name: name !== undefined ? name : olympiad.name,
                topic_olympiads: topic_olympiads !== undefined ? topic_olympiads : olympiad.topic_olympiads,
                date: date !== undefined ? date : olympiad.date,
            });

            res.status(200).json(olympiad);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления олимпиады'));
        }
    }

    // Удалить олимпиаду
    async deleteOlympiad(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Olympiad.destroy({ where: { id_olympiads: id } });

            if (!deleted) {
                return next(ApiError.notFound('Олимпиада не найдена'));
            }

            res.status(200).json({ message: 'Олимпиада успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления олимпиады'));
        }
    }
}

module.exports = new OlympiadController();
