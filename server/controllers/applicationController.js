const { InternshipApplication } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class ApplicationController {
    // Создать заявку
    async createApplication(req, res, next) {
        try {
            const { contacts, application_date, application_status, resume_link } = req.body;

            // Проверка обязательных полей
            if (!contacts || !application_date || !application_status) {
                return next(ApiError.badRequest('Поля contacts, application_date и application_status обязательны'));
            }

            const newApplication = await InternshipApplication.create({
                contacts,
                application_date,
                application_status,
                resume_link,
            });

            res.status(201).json(newApplication);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания заявки на стажировку'));
        }
    }

    // Получить все заявки
    async getApplications(req, res, next) {
        try {
            const applications = await InternshipApplication.findAll();
            res.status(200).json(applications);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения заявок на стажировку'));
        }
    }

    // Получить заявку по ID
    async getApplicationById(req, res, next) {
        try {
            const { id } = req.params;
            const application = await InternshipApplication.findByPk(id);

            if (!application) {
                return next(ApiError.notFound('Заявка не найдена'));
            }

            res.status(200).json(application);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения заявки на стажировку'));
        }
    }

    // Обновить заявку
    async updateApplication(req, res, next) {
        try {
            const { id } = req.params;
            const { contacts, application_date, application_status, resume_link } = req.body;

            const application = await InternshipApplication.findByPk(id);

            if (!application) {
                return next(ApiError.notFound('Заявка не найдена'));
            }

            // Обновляем поля
            await application.update({
                contacts: contacts || application.contacts,
                application_date: application_date || application.application_date,
                application_status: application_status || application.application_status,
                resume_link: resume_link || application.resume_link,
            });

            res.status(200).json(application);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления заявки на стажировку'));
        }
    }

    // Удалить заявку
    async deleteApplication(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await InternshipApplication.destroy({ where: { application_id: id } });

            if (!deleted) {
                return next(ApiError.notFound('Заявка не найдена'));
            }

            res.status(200).json({ message: 'Заявка успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления заявки на стажировку'));
        }
    }
}

module.exports = new ApplicationController();