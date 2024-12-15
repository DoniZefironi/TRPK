const { OlympiadResults } = require('../models/models'); // Проверьте правильность пути
const ApiError = require('../error/ApiError');

class ResultController {
    // Создать результат олимпиады
    async createResult(req, res, next) {
        try {
            const { id_olympiads, team_name, score, position } = req.body;

            // Проверка обязательных полей
            if (!id_olympiads || !team_name || score === undefined || position === undefined) {
                return next(ApiError.badRequest('Поля id_olympiads, team_name, score и position обязательны'));
            }

            const newResult = await OlympiadResults.create({
                id_olympiads,
                team_name,
                score,
                position,
            });

            res.status(201).json(newResult);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания результата олимпиады'));
        }
    }

    // Получить все результаты олимпиады
    async getResults(req, res, next) {
        try {
            const results = await OlympiadResults.findAll();
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения результатов олимпиады'));
        }
    }

    // Получить результат олимпиады по ID
    async getResultById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await OlympiadResults.findByPk(id);

            if (!result) {
                return next(ApiError.notFound('Результат олимпиады не найден'));
            }

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения результата олимпиады'));
        }
    }

    // Обновить результат олимпиады
    async updateResult(req, res, next) {
        try {
            const { id } = req.params;
            const { id_olympiads, team_name, score, position } = req.body;

            const result = await OlympiadResults.findByPk(id);

            if (!result) {
                return next(ApiError.notFound('Результат олимпиады не найден'));
            }

            await result.update({
                id_olympiads: id_olympiads !== undefined ? id_olympiads : result.id_olympiads,
                team_name: team_name !== undefined ? team_name : result.team_name,
                score: score !== undefined ? score : result.score,
                position: position !== undefined ? position : result.position,
            });

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления результата олимпиады'));
        }
    }

    // Удалить результат олимпиады
    async deleteResult(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await OlympiadResults.destroy({ where: { id_result: id } });

            if (!deleted) {
                return next(ApiError.notFound('Результат олимпиады не найден'));
            }

            res.status(200).json({ message: 'Результат олимпиады успешно удален' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления результата олимпиады'));
        }
    }
}

module.exports = new ResultController();
