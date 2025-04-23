const models = require('../models/models');
const ApiError = require('../error/ApiError');

class CareerGuidanceController {
    // Создание записи о карьерном ориентировании
    async create(req, res, next) {
        try {
            const { date_career_guidance, topic_career_guidance, consultants } = req.body;
            
            if (!date_career_guidance || !topic_career_guidance) {
                return next(ApiError.badRequest('Не указаны обязательные поля: date_career_guidance, topic_career_guidance'));
            }

            const careerGuidance = await models.CareerGuidanceInformatics.create({
                date_career_guidance,
                topic_career_guidance,
                consultants: consultants || null
            });

            return res.status(201).json({
                success: true,
                data: careerGuidance,
                message: 'Запись о карьерном ориентировании успешно создана'
            });
        } catch (e) {
            console.error('Ошибка при создании записи:', e);
            next(ApiError.internal('Не удалось создать запись о карьерном ориентировании'));
        }
    }

    // Получение всех записей с пагинацией
    async getAll(req, res, next) {
        try {
            let { page = 1, limit = 10, dateFrom, dateTo, search } = req.query;
            
            const where = {};
            
            // Фильтрация по дате
            if (dateFrom && dateTo) {
                where.date_career_guidance = {
                    [Op.between]: [new Date(dateFrom), new Date(dateTo)]
                };
            } else if (dateFrom) {
                where.date_career_guidance = {
                    [Op.gte]: new Date(dateFrom)
                };
            } else if (dateTo) {
                where.date_career_guidance = {
                    [Op.lte]: new Date(dateTo)
                };
            }
            
            // Поиск по теме или консультантам
            if (search) {
                where[Op.or] = [
                    { topic_career_guidance: { [Op.iLike]: `%${search}%` } },
                    { consultants: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const { count, rows: careerGuidances } = await models.CareerGuidanceInformatics.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                order: [['date_career_guidance', 'DESC']]
            });

            return res.json({
                success: true,
                data: careerGuidances,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (e) {
            console.error('Ошибка при получении записей:', e);
            next(ApiError.internal('Не удалось получить записи о карьерном ориентировании'));
        }
    }

    // Получение одной записи
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            
            const careerGuidance = await models.CareerGuidanceInformatics.findByPk(id);
            
            if (!careerGuidance) {
                return next(ApiError.notFound('Запись о карьерном ориентировании не найдена'));
            }

            return res.json({
                success: true,
                data: careerGuidance
            });
        } catch (e) {
            console.error('Ошибка при получении записи:', e);
            next(ApiError.internal('Не удалось получить запись о карьерном ориентировании'));
        }
    }

    // Обновление записи
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { date_career_guidance, topic_career_guidance, consultants } = req.body;
            
            const careerGuidance = await models.CareerGuidanceInformatics.findByPk(id);
            
            if (!careerGuidance) {
                return next(ApiError.notFound('Запись о карьерном ориентировании не найдена'));
            }

            await careerGuidance.update({
                date_career_guidance: date_career_guidance || careerGuidance.date_career_guidance,
                topic_career_guidance: topic_career_guidance || careerGuidance.topic_career_guidance,
                consultants: consultants !== undefined ? consultants : careerGuidance.consultants
            });

            return res.json({
                success: true,
                data: careerGuidance,
                message: 'Запись о карьерном ориентировании успешно обновлена'
            });
        } catch (e) {
            console.error('Ошибка при обновлении записи:', e);
            next(ApiError.internal('Не удалось обновить запись о карьерном ориентировании'));
        }
    }

    // Удаление записи
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            const careerGuidance = await models.CareerGuidanceInformatics.findByPk(id);
            
            if (!careerGuidance) {
                return next(ApiError.notFound('Запись о карьерном ориентировании не найдена'));
            }

            await careerGuidance.destroy();
            
            return res.json({
                success: true,
                message: 'Запись о карьерном ориентировании успешно удалена'
            });
        } catch (e) {
            console.error('Ошибка при удалении записи:', e);
            next(ApiError.internal('Не удалось удалить запись о карьерном ориентировании'));
        }
    }

    // Получение записей по дате
    async getByDate(req, res, next) {
        try {
            const { date } = req.query;
            
            if (!date) {
                return next(ApiError.badRequest('Не указана дата'));
            }

            const careerGuidances = await models.CareerGuidanceInformatics.findAll({
                where: {
                    date_career_guidance: new Date(date)
                },
                order: [['date_career_guidance', 'ASC']]
            });

            return res.json({
                success: true,
                data: careerGuidances
            });
        } catch (e) {
            console.error('Ошибка при получении записей по дате:', e);
            next(ApiError.internal('Не удалось получить записи по указанной дате'));
        }
    }
}

module.exports = new CareerGuidanceController();