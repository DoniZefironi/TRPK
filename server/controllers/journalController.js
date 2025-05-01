const models = require('../models/models');
const ApiError = require('../error/ApiError');

const getJournalModel = (course) => {
    if (!course || typeof course !== 'string') {
        return null;
    }

    switch (course.toLowerCase()) {
        case 'electric': return models.JournalElectric;
        case 'iot': return models.JournalIoT;
        case 'informatics': return models.JournalInformatics;
        default: return null;
    }
};

const getLectureModel = (course) => {
    if (!course || typeof course !== 'string') {
        return null;
    }

    const capitalizedCourse = course.charAt(0).toUpperCase() + course.slice(1).toLowerCase();
    return models[`Lecture${capitalizedCourse}`] || null;
};

class JournalController {
    // Добавление оценки студенту за лекцию
    async addGrade(req, res, next) {
        try {
            const { course } = req.params;
            const { id_user, id_classes, grades, academic_performance } = req.body;
            
            const journalModel = getJournalModel(course);
            const lectureModel = getLectureModel(course);

            if (!journalModel || !lectureModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            // Проверяем существование лекции
            const lecture = await lectureModel.findByPk(id_classes);
            if (!lecture) {
                return next(ApiError.badRequest('Лекция не найдена'));
            }

            // Проверяем существование пользователя
            const user = await models.User.findByPk(id_user);
            if (!user) {
                return next(ApiError.badRequest('Студент не найден'));
            }

            // Проверяем, не существует ли уже оценки для этого студента и лекции
            const existingGrade = await journalModel.findOne({
                where: { id_user, id_classes }
            });

            if (existingGrade) {
                return next(ApiError.badRequest('Оценка для этого студента и лекции уже существует'));
            }

            const newEntry = await journalModel.create({ 
                id_user, 
                id_classes,
                grades, 
                academic_performance, 
                change_date: new Date() 
            });
            
            return res.json(newEntry);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Получение всех записей журнала с пагинацией и фильтрацией
    async getAllGrades(req, res, next) {
        try {
            const { course } = req.params;
            let { page = 1, limit = 10, userId, lectureId } = req.query;
    
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const offset = (page - 1) * limit;
    
            const journalModel = getJournalModel(course);
            const lectureModel = getLectureModel(course);
            
            if (!journalModel || !lectureModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }
    
            // Подготовка условий WHERE
            const where = {};
            if (userId) where.id_user = userId;
            if (lectureId) where.id_classes = lectureId;
    
            const journalEntries = await journalModel.findAndCountAll({
                where,
                limit,
                offset,
                order: [['change_date', 'DESC']],
                include: [
                    {
                        model: lectureModel,
                        attributes: ['lecture_title', 'date']
                    },
                    {
                        model: models.User,
                        attributes: ['id_user', 'username', 'email']
                    }
                ]
            });
    
            return res.json({
                data: journalEntries.rows,
                pagination: {
                    totalItems: journalEntries.count,
                    totalPages: Math.ceil(journalEntries.count / limit),
                    currentPage: page,
                    itemsPerPage: limit
                }
            });
        } catch (e) {
            console.error('Journal get error:', e);
            return next(ApiError.internal(e.message));
        }
    }

    // Получение конкретной записи журнала по ID
    async getGradeById(req, res, next) {
        try {
            const { course, id } = req.params;
            const journalModel = getJournalModel(course);
            
            if (!journalModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const journalEntry = await journalModel.findByPk(id, {
                include: [
                    {
                        model: models.User,
                        attributes: ['id_user', 'username', 'email']
                    },
                    {
                        model: getLectureModel(course),
                        attributes: ['lecture_title', 'date', 'description']
                    }
                ]
            });
            
            if (!journalEntry) {
                return next(ApiError.notFound('Запись журнала не найдена'));
            }
            
            return res.json(journalEntry);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Обновление оценки
    async updateGrade(req, res, next) {
        try {
            const { course, id } = req.params;
            const { grades, academic_performance } = req.body;
            
            const journalModel = getJournalModel(course);
            
            if (!journalModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const journalEntry = await journalModel.findByPk(id);
            if (!journalEntry) {
                return next(ApiError.notFound('Запись журнала не найдена'));
            }

            // Проверяем, что есть хотя бы одно поле для обновления
            if (!grades && !academic_performance) {
                return next(ApiError.badRequest('Не указаны данные для обновления'));
            }

            const updateData = { change_date: new Date() };
            if (grades) updateData.grades = grades;
            if (academic_performance) updateData.academic_performance = academic_performance;

            await journalEntry.update(updateData);
            
            return res.json(journalEntry);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Удаление оценки
    async deleteGrade(req, res, next) {
        try {
            const { course, id } = req.params;
            const journalModel = getJournalModel(course);
            
            if (!journalModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const journalEntry = await journalModel.findByPk(id);
            if (!journalEntry) {
                return next(ApiError.notFound('Запись журнала не найдена'));
            }

            await journalEntry.destroy();
            return res.json({ message: 'Оценка успешно удалена' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Получение оценок конкретного студента
    async getStudentGrades(req, res, next) {
        try {
            const { course, userId } = req.params;
            const journalModel = getJournalModel(course);
            const lectureModel = getLectureModel(course);
            
            if (!journalModel || !lectureModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            // Проверяем существование пользователя
            const user = await models.User.findByPk(userId);
            if (!user) {
                return next(ApiError.badRequest('Студент не найден'));
            }

            const grades = await journalModel.findAll({
                where: { id_user: userId },
                include: [
                    {
                        model: lectureModel,
                        attributes: ['id_classes', 'lecture_title', 'date', 'description']
                    }
                ],
                order: [[lectureModel, 'date', 'DESC']]
            });
            
            return res.json(grades);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Получение оценок по конкретной лекции
    async getLectureGrades(req, res, next) {
        try {
            const { course, lectureId } = req.params;
            const journalModel = getJournalModel(course);
            const lectureModel = getLectureModel(course);
            
            if (!journalModel || !lectureModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            // Проверяем существование лекции
            const lecture = await lectureModel.findByPk(lectureId);
            if (!lecture) {
                return next(ApiError.badRequest('Лекция не найдена'));
            }

            const grades = await journalModel.findAll({
                where: { id_classes: lectureId },
                include: [
                    {
                        model: models.User,
                        attributes: ['id_user', 'username', 'email']
                    }
                ],
                order: [['change_date', 'DESC']]
            });
            
            return res.json({
                lectureInfo: {
                    id_classes: lecture.id_classes,
                    lecture_title: lecture.lecture_title,
                    date: lecture.date
                },
                grades
            });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new JournalController();