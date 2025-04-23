const models = require('../models/models');
const ApiError = require('../error/ApiError');

class InternshipApplicationController {
    // Создание заявки на стажировку
    async create(req, res, next) {
        try {
            const { contacts, application_status, resume_link, id_user } = req.body;
            
            if (!contacts || !id_user) {
                return next(ApiError.badRequest('Не указаны обязательные поля: contacts, id_user'));
            }

            const application = await models.InternshipApplicationIoT.create({
                contacts,
                application_date: new Date(),
                application_status: application_status || 'pending',
                resume_link: resume_link || null,
                id_user
            });

            return res.status(201).json({
                success: true,
                data: application,
                message: 'Заявка на стажировку успешно создана'
            });
        } catch (e) {
            console.error('Ошибка при создании заявки:', e);
            next(ApiError.internal('Не удалось создать заявку на стажировку'));
        }
    }

    // Получение всех заявок с пагинацией
    async getAll(req, res, next) {
        try {
            let { page = 1, limit = 10, status, userId } = req.query;
            
            const where = {};
            if (status) where.application_status = status;
            if (userId) where.id_user = userId;

            const { count, rows: applications } = await models.InternshipApplicationIoT.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                order: [['application_date', 'DESC']],
                include: [{
                    model: models.User,
                    attributes: ['id_user', 'username', 'email']
                }]
            });

            return res.json({
                success: true,
                data: applications,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (e) {
            console.error('Ошибка при получении заявок:', e);
            next(ApiError.internal('Не удалось получить заявки на стажировку'));
        }
    }

    // Получение конкретной заявки
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            
            const application = await models.InternshipApplicationIoT.findByPk(id, {
                include: [{
                    model: models.User,
                    attributes: ['id_user', 'username', 'email', 'phone']
                }]
            });

            if (!application) {
                return next(ApiError.notFound('Заявка не найдена'));
            }

            return res.json({
                success: true,
                data: application
            });
        } catch (e) {
            console.error('Ошибка при получении заявки:', e);
            next(ApiError.internal('Не удалось получить заявку на стажировку'));
        }
    }

    // Обновление заявки
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { application_status, resume_link } = req.body;
            
            const application = await models.InternshipApplicationIoT.findByPk(id);
            if (!application) {
                return next(ApiError.notFound('Заявка не найдена'));
            }

            await application.update({
                application_status: application_status || application.application_status,
                resume_link: resume_link !== undefined ? resume_link : application.resume_link
            });

            return res.json({
                success: true,
                data: application,
                message: 'Заявка успешно обновлена'
            });
        } catch (e) {
            console.error('Ошибка при обновлении заявки:', e);
            next(ApiError.internal('Не удалось обновить заявку на стажировку'));
        }
    }

    // Удаление заявки
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            const application = await models.InternshipApplicationIoT.findByPk(id);
            if (!application) {
                return next(ApiError.notFound('Заявка не найдена'));
            }

            await application.destroy();
            return res.json({
                success: true,
                message: 'Заявка успешно удалена'
            });
        } catch (e) {
            console.error('Ошибка при удалении заявки:', e);
            next(ApiError.internal('Не удалось удалить заявку на стажировку'));
        }
    }
}

module.exports = new InternshipApplicationController();