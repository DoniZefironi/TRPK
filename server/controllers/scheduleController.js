const { Schedule } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class ScheduleController {
    // Создать расписание
    async createSchedule(req, res, next) {
        try {
            const { id_lesson, id_class, id_elective, date } = req.body;

            // Проверка обязательных полей
            if (!id_class || !date) {
                return next(ApiError.badRequest('Поля id_class и date обязательны'));
            }

            const newSchedule = await Schedule.create({
                id_lesson,
                id_class,
                id_elective,
                date,
            });

            res.status(201).json(newSchedule);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания расписания'));
        }
    }

    // Получить все записи расписания
    async getSchedules(req, res, next) {
        try {
            const schedules = await Schedule.findAll();
            res.status(200).json(schedules);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения расписания'));
        }
    }

    // Получить расписание по ID
    async getScheduleById(req, res, next) {
        try {
            const { id } = req.params;
            const schedule = await Schedule.findByPk(id);

            if (!schedule) {
                return next(ApiError.notFound('Запись расписания не найдена'));
            }

            res.status(200).json(schedule);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения записи расписания'));
        }
    }

    // Обновить запись расписания
    async updateSchedule(req, res, next) {
        try {
            const { id } = req.params;
            const { id_lesson, id_class, id_elective, date } = req.body;

            const schedule = await Schedule.findByPk(id);

            if (!schedule) {
                return next(ApiError.notFound('Запись расписания не найдена'));
            }

            await schedule.update({
                id_lesson: id_lesson !== undefined ? id_lesson : schedule.id_lesson,
                id_class: id_class !== undefined ? id_class : schedule.id_class,
                id_elective: id_elective !== undefined ? id_elective : schedule.id_elective,
                date: date !== undefined ? date : schedule.date,
            });

            res.status(200).json(schedule);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления расписания'));
        }
    }

    // Удалить запись расписания
    async deleteSchedule(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Schedule.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Запись расписания не найдена'));
            }

            res.status(200).json({ message: 'Запись расписания успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления записи расписания'));
        }
    }
}

module.exports = new ScheduleController();
