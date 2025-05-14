const models = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

// Helpers
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const getScheduleModel = (course) => {
    const modelsMap = {
        'electric': models.ScheduleElectric,
        'iot': models.ScheduleIoT,
        'informatics': models.ScheduleInformatics
    };
    return modelsMap[course.toLowerCase()] || null;
};

class ScheduleController {
    async createScheduleItem(req, res, next) {
        try {
            const { course } = req.params;
            const { id_group, id_classes, date, time } = req.body;
            const scheduleModel = getScheduleModel(course);
            const courseName = capitalize(course);

            if (!scheduleModel) {
                return next(ApiError.badRequest('Invalid course'));
            }

            if (!id_group || !id_classes || !date) {
                return next(ApiError.badRequest('Missing required fields: id_group, id_classes, date'));
            }

            const groupModel = models[`${courseName}Group`];
            if (!groupModel) return next(ApiError.badRequest('Group model not found'));
            const group = await groupModel.findByPk(id_group);
            if (!group) return next(ApiError.badRequest('Group not found'));

            const lectureModel = models[`Lecture${courseName}`];
            if (!lectureModel) return next(ApiError.badRequest('Lecture model not found'));
            const lecture = await lectureModel.findByPk(id_classes);
            if (!lecture) return next(ApiError.badRequest('Lecture not found'));

            const newItem = await scheduleModel.create({
                id_group,
                id_classes,
                date,
                time: time || null
            });

            return res.status(201).json({
                success: true,
                data: newItem,
                message: 'Schedule item created successfully'
            });
        } catch (e) {
            console.error('Error creating schedule item:', e);
            next(ApiError.internal('Failed to create schedule item'));
        }
    }

    async getSchedule(req, res, next) {
        try {
            const { course } = req.params;
            let { page = 1, limit = 10, startDate, endDate } = req.query;
            const scheduleModel = getScheduleModel(course);
            const courseName = capitalize(course);

            if (!scheduleModel) {
                return next(ApiError.badRequest('Invalid course'));
            }

            const where = {};
            if (startDate && endDate) {
                where.date = { [Op.between]: [new Date(startDate), new Date(endDate)] };
            } else if (startDate) {
                where.date = { [Op.gte]: new Date(startDate) };
            } else if (endDate) {
                where.date = { [Op.lte]: new Date(endDate) };
            }

            const include = [
                {
                    model: models[`Lecture${courseName}`],
                    attributes: ['id_classes', 'lecture_title', 'description']
                },
                {
                    model: models[`${courseName}Group`],
                    attributes: ['id_group', 'name']
                }
            ];

            const { count, rows: schedule } = await scheduleModel.findAndCountAll({
                where,
                include,
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                order: [['date', 'ASC'], ['time', 'ASC']]
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
            console.error('Error getting schedule:', e);
            next(ApiError.internal('Failed to get schedule'));
        }
    }

    async getScheduleItem(req, res, next) {
        try {
            const { course, id } = req.params;
            const courseName = capitalize(course);
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) return next(ApiError.badRequest('Invalid course'));

            const item = await scheduleModel.findByPk(id, {
                include: [
                    {
                        model: models[`Lecture${courseName}`],
                        attributes: ['id_classes', 'lecture_title', 'description', 'slides']
                    },
                    {
                        model: models[`${courseName}Group`],
                        attributes: ['id_group', 'name', 'description']
                    }
                ]
            });

            if (!item) return next(ApiError.notFound('Schedule item not found'));

            return res.json({ success: true, data: item });
        } catch (e) {
            console.error('Error getting schedule item:', e);
            next(ApiError.internal('Failed to get schedule item'));
        }
    }

    async updateScheduleItem(req, res, next) {
        try {
            const { course, id } = req.params;
            const { id_group, id_classes, date, time } = req.body;
            const courseName = capitalize(course);
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) return next(ApiError.badRequest('Invalid course'));

            const item = await scheduleModel.findByPk(id);
            if (!item) return next(ApiError.notFound('Schedule item not found'));

            if (id_group) {
                const groupModel = models[`${courseName}Group`];
                const group = await groupModel.findByPk(id_group);
                if (!group) return next(ApiError.badRequest('Group not found'));
            }

            if (id_classes) {
                const lectureModel = models[`Lecture${courseName}`];
                const lecture = await lectureModel.findByPk(id_classes);
                if (!lecture) return next(ApiError.badRequest('Lecture not found'));
            }

            await item.update({
                id_group: id_group || item.id_group,
                id_classes: id_classes || item.id_classes,
                date: date || item.date,
                time: time !== undefined ? time : item.time
            });

            return res.json({
                success: true,
                data: item,
                message: 'Schedule item updated successfully'
            });
        } catch (e) {
            console.error('Error updating schedule item:', e);
            next(ApiError.internal('Failed to update schedule item'));
        }
    }

    async deleteScheduleItem(req, res, next) {
        try {
            const { course, id } = req.params;
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) return next(ApiError.badRequest('Invalid course'));

            const item = await scheduleModel.findByPk(id);
            if (!item) return next(ApiError.notFound('Schedule item not found'));

            await item.destroy();
            return res.json({ success: true, message: 'Schedule item deleted successfully' });
        } catch (e) {
            console.error('Error deleting schedule item:', e);
            next(ApiError.internal('Failed to delete schedule item'));
        }
    }

    async getScheduleByDate(req, res, next) {
        try {
            const { course } = req.params;
            const { date, id_group } = req.query;
            const courseName = capitalize(course);
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) return next(ApiError.badRequest('Invalid course'));
            if (!date) return next(ApiError.badRequest('Date not specified'));

            const where = { date: new Date(date) };
            if (id_group) where.id_group = id_group;

            const schedule = await scheduleModel.findAll({
                where,
                order: [['time', 'ASC']],
                include: [
                    {
                        model: models[`Lecture${courseName}`],
                        attributes: ['id_classes', 'lecture_title']
                    },
                    {
                        model: models[`${courseName}Group`],
                        attributes: ['id_group', 'name']
                    }
                ]
            });

            return res.json({ success: true, data: schedule });
        } catch (e) {
            console.error('Error getting schedule by date:', e);
            next(ApiError.internal('Failed to get schedule by date'));
        }
    }

    async getGroupSchedule(req, res, next) {
        try {
            const { course, id_group } = req.params;
            let { page = 1, limit = 10, startDate, endDate } = req.query;
            const courseName = capitalize(course);
            const scheduleModel = getScheduleModel(course);
            if (!scheduleModel) return next(ApiError.badRequest('Invalid course'));

            const groupModel = models[`${courseName}Group`];
            const group = await groupModel.findByPk(id_group);
            if (!group) return next(ApiError.badRequest('Group not found'));

            const where = { id_group };
            if (startDate && endDate) {
                where.date = { [Op.between]: [new Date(startDate), new Date(endDate)] };
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
                include: [
                    {
                        model: models[`Lecture${courseName}`],
                        attributes: ['id_classes', 'lecture_title', 'description']
                    }
                ]
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
            console.error('Error getting group schedule:', e);
            next(ApiError.internal('Failed to get group schedule'));
        }
    }
}

module.exports = new ScheduleController();
