const models = require('../models/models');
const ApiError = require('../error/ApiError');

const getLessonModel = (course) => {
    const modelsMap = {
        'electric': models.LectureElectric,
        'iot': models.LectureIoT,
        'informatics': models.LectureInformatics
    };
    return modelsMap[course.toLowerCase()] || null;
};

class LessonController {

    // Создание урока
    async createLesson(req, res, next) {
        try {
            const { course } = req.params;
            const { title, description, id_materials, duration, date, slides } = req.body;
            
            const lessonModel = getLessonModel(course);
            if (!lessonModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            // Проверка существования материала, если указан
            if (id_materials) {
                const material = await models.MaterialsLibrary.findByPk(id_materials);
                if (!material) {
                    return next(ApiError.notFound('Материал не найден'));
                }
            }

            const newLesson = await lessonModel.create({
                lecture_title: title,
                description,
                id_materials,
                duration,
                date,
                slides
            });
            
            return res.json(newLesson);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Получение всех уроков с пагинацией
    async getAllLessons(req, res, next) {
        try {
            const { course } = req.params;
            let { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const lessonModel = getLessonModel(course);
            if (!lessonModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const lessons = await lessonModel.findAndCountAll({
                include: [{
                    model: models.MaterialsLibrary,
                    attributes: ['id_material', 'title', 'file_url']
                }],
                limit,
                offset,
                order: [['date', 'DESC']]
            });
            
            return res.json(lessons);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Получение конкретного урока
    async getLesson(req, res, next) {
        try {
            const { course, id } = req.params;
            const lessonModel = getLessonModel(course);
            
            if (!lessonModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const lesson = await lessonModel.findByPk(id, {
                include: [{
                    model: models.MaterialsLibrary,
                    attributes: ['id_material', 'title', 'description', 'file_url']
                }]
            });
            
            if (!lesson) {
                return next(ApiError.notFound('Урок не найден'));
            }
            
            return res.json(lesson);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Обновление урока
    async updateLesson(req, res, next) {
        try {
            const { course, id } = req.params;
            const { title, description, id_materials, duration, date, slides } = req.body;
            
            const lessonModel = getLessonModel(course);
            if (!lessonModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const lesson = await lessonModel.findByPk(id);
            if (!lesson) {
                return next(ApiError.notFound('Урок не найден'));
            }

            // Проверка существования материала, если указан
            if (id_materials) {
                const material = await models.MaterialsLibrary.findByPk(id_materials);
                if (!material) {
                    return next(ApiError.notFound('Материал не найден'));
                }
            }

            await lesson.update({
                lecture_title: title,
                description,
                id_materials,
                duration,
                date,
                slides
            });
            
            return res.json(lesson);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Удаление урока
    async deleteLesson(req, res, next) {
        try {
            const { course, id } = req.params;
            const lessonModel = getLessonModel(course);
            
            if (!lessonModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            const lesson = await lessonModel.findByPk(id);
            if (!lesson) {
                return next(ApiError.notFound('Урок не найден'));
            }

            await lesson.destroy();
            return res.json({ message: 'Урок успешно удален' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Получение уроков по дате (дополнительный метод)
    async getLessonsByDate(req, res, next) {
        try {
            const { course } = req.params;
            const { date } = req.query;
            
            const lessonModel = getLessonModel(course);
            if (!lessonModel) {
                return next(ApiError.badRequest('Недопустимый курс'));
            }

            if (!date) {
                return next(ApiError.badRequest('Не указана дата'));
            }

            const lessons = await lessonModel.findAll({
                where: { date },
                include: [{
                    model: models.MaterialsLibrary,
                    attributes: ['id_material', 'title']
                }],
                order: [['time', 'ASC']]
            });
            
            return res.json(lessons);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new LessonController();