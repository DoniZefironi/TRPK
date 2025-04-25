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


class JournalController {
    // Добавление оценки и успеваемости студенту
    async addGrade(req, res, next) {
        try {
            const { course, id_user, id_classes, grades, academic_performance } = req.body;
            const journalModel = getJournalModel(course);

            if (!journalModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
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

    // Получение всех записей журнала с пагинацией
    async getJournal(req, res, next) {
        try {
            const { course } = req.params;
            let { page = 1, limit = 10 } = req.query;
    
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const offset = (page - 1) * limit;
    
            const journalModel = getJournalModel(course);
            if (!journalModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }
    
            // Упрощенный запрос без include для тестирования
            const journalEntries = await journalModel.findAndCountAll({
                limit,
                offset,
                order: [['id_journal', 'DESC']]
            });
    
            return res.json({
                rows: journalEntries.rows,
                count: journalEntries.count,
                currentPage: page,
                totalPages: Math.ceil(journalEntries.count / limit),
                limit
            });
        } catch (e) {
            console.error('Journal get error:', e);
            return next(ApiError.internal(e.message));
        }
    }

    // Получение оценок конкретного студента
    async getStudentGrades(req, res, next) {
        try {
            const { course, id_user } = req.params;
            const journalModel = getJournalModel(course);

            if (!journalModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const grades = await journalModel.findAll({
                where: { id_user },
                include: [{
                    model: models[`Lecture${course.charAt(0).toUpperCase() + course.slice(1)}`],
                    attributes: ['lecture_title', 'date']
                }]
            });
            
            return res.json(grades);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Обновление оценки и успеваемости
    async updateGrade(req, res, next) {
        try {
            const { course, id_journal } = req.params;
            const { grades, academic_performance } = req.body;
            const journalModel = getJournalModel(course);

            if (!journalModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const journalEntry = await journalModel.findByPk(id_journal);
            if (!journalEntry) {
                return next(ApiError.notFound('Запись журнала не найдена'));
            }

            await journalEntry.update({ 
                grades, 
                academic_performance, 
                change_date: new Date() 
            });
            
            return res.json(journalEntry);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Удаление записи журнала
    async deleteGrade(req, res, next) {
        try {
            const { course, id_journal } = req.params;
            const journalModel = getJournalModel(course);

            if (!journalModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const journalEntry = await journalModel.findByPk(id_journal);
            if (!journalEntry) {
                return next(ApiError.notFound('Запись журнала не найдена'));
            }

            await journalEntry.destroy();
            return res.json({ message: 'Запись успешно удалена' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new JournalController();