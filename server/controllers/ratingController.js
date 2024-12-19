class RatingController {
    // Создать рейтинг пользователя
    async createRating(req, res, next) {
        try {
            const { score, period, id_user } = req.body;

            // Проверка обязательных полей
            if (!score || !period || !id_user) {
                return next(ApiError.badRequest('Поля score, period и id_user обязательны'));
            }

            const newRating = await UserRating.create({
                score,
                period,
                id_user
            });

            res.status(201).json(newRating);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания рейтинга пользователя'));
        }
    }

    // Получить все рейтинги пользователей
    async getRatings(req, res, next) {
        try {
            const ratings = await UserRating.findAll();
            res.status(200).json(ratings);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения рейтингов пользователей'));
        }
    }

    // Получить рейтинг пользователя по ID
    async getRatingById(req, res, next) {
        try {
            const { id } = req.params;
            const rating = await UserRating.findByPk(id);

            if (!rating) {
                return next(ApiError.notFound('Рейтинг пользователя не найден'));
            }

            res.status(200).json(rating);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения рейтинга пользователя'));
        }
    }

    // Обновить рейтинг пользователя
    async updateRating(req, res, next) {
        try {
            const { id } = req.params;
            const { score, period, id_user } = req.body;

            const rating = await UserRating.findByPk(id);

            if (!rating) {
                return next(ApiError.notFound('Рейтинг пользователя не найден'));
            }

            await rating.update({
                score: score !== undefined ? score : rating.score,
                period: period || rating.period,
                id_user: id_user || rating.id_user
            });

            res.status(200).json(rating);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления рейтинга пользователя'));
        }
    }

    // Удалить рейтинг пользователя
    async deleteRating(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await UserRating.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Рейтинг пользователя не найден'));
            }

            res.status(200).json({ message: 'Рейтинг пользователя успешно удален' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления рейтинга пользователя'));
        }
    }
}

module.exports = new RatingController();