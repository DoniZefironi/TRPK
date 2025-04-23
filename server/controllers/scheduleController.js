const models = require('../models/models');
const ApiError = require('../error/ApiError');

    // Получить модель расписания по курсу
    const getScheduleModel = (course) => {
        const modelsMap = {
            'electric': models.ScheduleElectric,
            'iot': models.ScheduleIoT,
            'informatics': models.ScheduleInformatics
        };
        return modelsMap[course.toLowerCase()] || null;
    };

class ScheduleController {

    // Создание записи в расписании
    async createScheduleItem(req, res, next) {
        try {
            const { course } = req.params;
            const { id_classes, date, time } = req.body;
            
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            // Валидация обязательных полей
            if (!id_classes || !date) {
                return next(ApiError.badRequest('Не указаны обязательные поля: id_classes, date'));
            }

            const newItem = await scheduleModel.create({ 
                id_classes, 
                date, 
                time: time || null
            });

            return res.status(201).json({
                success: true,
                data: newItem,
                message: 'Запись в расписании успешно создана'
            });
        } catch (e) {
            console.error('Ошибка при создании записи в расписании:', e);
            next(ApiError.internal('Не удалось создать запись в расписании'));
        }
    }

    // Получение расписания с пагинацией
    async getSchedule(req, res, next) {
        try {
            const { course } = req.params;
            let { page = 1, limit = 10, startDate, endDate } = req.query;
            
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            // Подготовка условий поиска
            const where = {};
            if (startDate && endDate) {
                where.date = {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                };
            } else if (startDate) {
                where.date = { [Op.gte]: new Date(startDate) };
            } else if (endDate) {
                where.date = { [Op.lte]: new Date(endDate) };
            }

            const { count, rows: schedule } = await scheduleModel.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                order: [['date', 'ASC'], ['time', 'ASC']],
                include: [{
                    model: models[`Lecture${course}`],
                    as: 'lecture',
                    attributes: ['id_classes', 'lecture_title', 'description']
                }]
            });

            return res.json({
                success: true,
                data: schedule,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (e) {
            console.error('Ошибка при получении расписания:', e);
            next(ApiError.internal('Не удалось получить расписание'));
        }
    }

    // Получение конкретной записи расписания
    async getScheduleItem(req, res, next) {
        try {
            const { course, id } = req.params;
            
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const item = await scheduleModel.findByPk(id, {
                include: [{
                    model: models[`Lecture${course}`],
                    as: 'lecture',
                    attributes: ['id_classes', 'lecture_title', 'description', 'slides']
                }]
            });

            if (!item) {
                return next(ApiError.notFound('Запись в расписании не найдена'));
            }

            return res.json({
                success: true,
                data: item
            });
        } catch (e) {
            console.error('Ошибка при получении записи расписания:', e);
            next(ApiError.internal('Не удалось получить запись из расписания'));
        }
    }

    // Обновление записи в расписании
    async updateScheduleItem(req, res, next) {
        try {
            const { course, id } = req.params;
            const { id_classes, date, time } = req.body;
            
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const item = await scheduleModel.findByPk(id);
            if (!item) {
                return next(ApiError.notFound('Запись в расписании не найдена'));
            }

            await item.update({ 
                id_classes: id_classes || item.id_classes,
                date: date || item.date,
                time: time !== undefined ? time : item.time
            });

            return res.json({
                success: true,
                data: item,
                message: 'Запись в расписании успешно обновлена'
            });
        } catch (e) {
            console.error('Ошибка при обновлении записи в расписании:', e);
            next(ApiError.internal('Не удалось обновить запись в расписании'));
        }
    }

    // Удаление записи из расписания
    async deleteScheduleItem(req, res, next) {
        try {
            const { course, id } = req.params;
            
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const item = await scheduleModel.findByPk(id);
            if (!item) {
                return next(ApiError.notFound('Запись в расписании не найдена'));
            }

            await item.destroy();
            return res.json({
                success: true,
                message: 'Запись в расписании успешно удалена'
            });
        } catch (e) {
            console.error('Ошибка при удалении записи из расписания:', e);
            next(ApiError.internal('Не удалось удалить запись из расписания'));
        }
    }

    // Получение расписания для конкретной даты
    async getScheduleByDate(req, res, next) {
        try {
            const { course } = req.params;
            const { date } = req.query;
            
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            if (!date) {
                return next(ApiError.badRequest('Не указана дата'));
            }

            const schedule = await scheduleModel.findAll({
                where: { 
                    date: new Date(date) 
                },
                order: [['time', 'ASC']],
                include: [{
                    model: models[`Lecture${course}`],
                    as: 'lecture',
                    attributes: ['id_classes', 'lecture_title']
                }]
            });

            return res.json({
                success: true,
                data: schedule
            });
        } catch (e) {
            console.error('Ошибка при получении расписания на дату:', e);
            next(ApiError.internal('Не удалось получить расписание на указанную дату'));
        }
    }
}

module.exports = new ScheduleController();