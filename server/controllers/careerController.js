const { CareerGuidance } = require('../models/models'); 
const ApiError = require('../error/ApiError');

class CareerController {
    // Создать запись профориентации
    async createCareerGuidance(req, res, next) {
        try {
            const { date_career_guidance, topic_career_guidance, consultants, id_class } = req.body;

            // Проверяем обязательные поля
            if (!id_class) {
                return next(ApiError.badRequest('Поле id_class обязательно'));
            }

            const newCareerGuidance = await CareerGuidance.create({
                date_career_guidance,
                topic_career_guidance,
                consultants,
                id_class,
            });

            res.status(201).json(newCareerGuidance);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания записи профориентации'));
        }
    }

    // Получить все записи профориентации
    async getCareerGuidances(req, res, next) {
        try {
            const careerGuidances = await CareerGuidance.findAll();
            res.status(200).json(careerGuidances);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения данных профориентации'));
        }
    }

    // Получить запись профориентации по ID
    async getCareerGuidanceById(req, res, next) {
        try {
            const { id } = req.params;
            const careerGuidance = await CareerGuidance.findByPk(id);

            if (!careerGuidance) {
                return next(ApiError.notFound('Запись профориентации не найдена'));
            }

            res.status(200).json(careerGuidance);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения записи профориентации'));
        }
    }

    // Удалить запись профориентации
    async deleteCareerGuidance(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await CareerGuidance.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Запись профориентации не найдена'));
            }

            res.status(200).json({ message: 'Запись успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления записи профориентации'));
        }
    }

    // Обновить запись профориентации
    async updateCareerGuidance(req, res, next) {
        try {
            const { id } = req.params;
            const { date_career_guidance, topic_career_guidance, consultants, id_class } = req.body;

            // Найти запись
            const careerGuidance = await CareerGuidance.findByPk(id);

            if (!careerGuidance) {
                return next(ApiError.notFound('Запись профориентации не найдена'));
            }

            // Обновить запись
            await careerGuidance.update({
                date_career_guidance: date_career_guidance || careerGuidance.date_career_guidance,
                topic_career_guidance: topic_career_guidance || careerGuidance.topic_career_guidance,
                consultants: consultants || careerGuidance.consultants,
                id_class: id_class || careerGuidance.id_class,
            });

            res.status(200).json(careerGuidance);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления записи профориентации'));
        }
    }
}

module.exports = new CareerController();
