const { HackathonResults } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class ResultController {
    // Создать результат хакатона
    async createResult(req, res, next) {
        try {
            const { id_hackathon, team_name, project_name, score, position } = req.body;

            // Проверка обязательных полей
            if (!id_hackathon || !team_name || !project_name || score === undefined || position === undefined) {
                return next(ApiError.badRequest('Все поля обязательны: id_hackathon, team_name, project_name, score, position'));
            }

            const newResult = await HackathonResults.create({
                id_hackathon,
                team_name,
                project_name,
                score,
                position,
            });

            res.status(201).json(newResult);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания результата хакатона'));
        }
    }

    // Получить все результаты
    async getResults(req, res, next) {
        try {
            const results = await HackathonResults.findAll();
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения результатов'));
        }
    }

    // Получить результат по ID
    async getResultById(req, res, next) {
        try {
            const { id } = req.params;

            const result = await HackathonResults.findByPk(id);

            if (!result) {
                return next(ApiError.notFound('Результат не найден'));
            }

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения результата'));
        }
    }

    // Обновить результат
    async updateResult(req, res, next) {
        try {
            const { id } = req.params;
            const { id_hackathon, team_name, project_name, score, position } = req.body;

            const result = await HackathonResults.findByPk(id);

            if (!result) {
                return next(ApiError.notFound('Результат не найден'));
            }

            await result.update({
                id_hackathon: id_hackathon || result.id_hackathon,
                team_name: team_name || result.team_name,
                project_name: project_name || result.project_name,
                score: score !== undefined ? score : result.score,
                position: position !== undefined ? position : result.position,
            });

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления результата'));
        }
    }

    // Удалить результат
    async deleteResult(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await HackathonResults.destroy({ where: { id_result: id } });

            if (!deleted) {
                return next(ApiError.notFound('Результат не найден'));
            }

            res.status(200).json({ message: 'Результат успешно удалён' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления результата'));
        }
    }
}

module.exports = new ResultController();