const { Hackathon } = require('../models/models'); // Убедитесь, что путь корректный
const ApiError = require('../error/ApiError');

class HackathonController {
    // Создать хакатон
    async createHackathon(req, res, next) {
        try {
            const { topic, date, organizers, id_user } = req.body;

            // Проверка обязательных полей
            if (!topic || !date || !organizers) {
                return next(ApiError.badRequest('Поля topic, date и organizers обязательны'));
            }

            const newHackathon = await Hackathon.create({
                topic,
                date,
                organizers,
                id_user,
            });

            res.status(201).json(newHackathon);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания хакатона'));
        }
    }

    // Получить все хакатоны
    async getHackathons(req, res, next) {
        try {
            const hackathons = await Hackathon.findAll();
            res.status(200).json(hackathons);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения хакатонов'));
        }
    }

    // Получить хакатон по ID
    async getHackathonById(req, res, next) {
        try {
            const { id } = req.params;

            const hackathon = await Hackathon.findByPk(id);

            if (!hackathon) {
                return next(ApiError.notFound('Хакатон не найден'));
            }

            res.status(200).json(hackathon);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения хакатона'));
        }
    }

    // Обновить хакатон
    async updateHackathon(req, res, next) {
        try {
            const { id } = req.params;
            const { topic, date, organizers, id_user } = req.body;

            const hackathon = await Hackathon.findByPk(id);

            if (!hackathon) {
                return next(ApiError.notFound('Хакатон не найден'));
            }

            await hackathon.update({
                topic: topic || hackathon.topic,
                date: date || hackathon.date,
                organizers: organizers || hackathon.organizers,
                id_user: id_user || hackathon.id_user,
            });

            res.status(200).json(hackathon);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления хакатона'));
        }
    }

    // Удалить хакатон
    async deleteHackathon(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await Hackathon.destroy({ where: { id_hackathon: id } });

            if (!deleted) {
                return next(ApiError.notFound('Хакатон не найден'));
            }

            res.status(200).json({ message: 'Хакатон успешно удалён' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления хакатона'));
        }
    }
}

module.exports = new HackathonController();