const { ScheduleIoT } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class ScheduleController {
    // Создать расписание
    async createSchedule(req, res, next) {
        try {
            const { date } = req.body;

            // Проверка обязательного поля
            if (!date) {
                return next(ApiError.badRequest('Поле date обязательно'));
            }

            const newSchedule = await ScheduleIoT.create({ date });

            res.status(201).json(newSchedule);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания расписания'));
        }
    }

    // Получить все расписания
    async getSchedules(req, res, next) {
        try {
            const schedules = await ScheduleIoT.findAll();
            res.status(200).json(schedules);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения расписаний'));
        }
    }

    // Получить расписание по ID
    async getScheduleById(req, res, next) {
        try {
            const { id } = req.params;
            const schedule = await ScheduleIoT.findByPk(id);

            if (!schedule) {
                return next(ApiError.notFound('Расписание не найдено'));
            }

            res.status(200).json(schedule);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения расписания'));
        }
    }

    // Обновить расписание
    async updateSchedule(req, res, next) {
        try {
            const { id } = req.params;
            const { date } = req.body;

            const schedule = await ScheduleIoT.findByPk(id);

            if (!schedule) {
                return next(ApiError.notFound('Расписание не найдено'));
            }

            await schedule.update({
                date: date || schedule.date
            });

            res.status(200).json(schedule);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления расписания'));
        }
    }

    // Удалить расписание
    async deleteSchedule(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await ScheduleIoT.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Расписание не найдено'));
            }

            res.status(200).json({ message: 'Расписание успешно удалено' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления расписания'));
        }
    }
}

module.exports = new ScheduleController();