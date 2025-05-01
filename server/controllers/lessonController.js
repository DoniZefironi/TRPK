const models = require('../models/models');
const ApiError = require('../error/ApiError');

// Функция для получения модели урока по курсу с выбрасыванием ошибки
const getLessonModel = (course) => {
    const modelsMap = {
        'electric': models.LectureElectric,
        'iot': models.LectureIoT,
        'informatics': models.LectureInformatics
    };
    const model = modelsMap[course.toLowerCase()];
    if (!model) {
        throw new ApiError.badRequest(`Недопустимый курс: ${course}`);
    }
    return model;
};

class LessonController {
    // Создание лекции
    async create(req, res, next) {
        try {
            const { course } = req.params;
            const lessonModel = getLessonModel(course);

            const existingLesson = await lessonModel.findOne({ where: { lecture_title: req.body.lecture_title } });
            if (existingLesson) {
                return next(ApiError.badRequest('Лекция с таким названием уже существует.'));
            }

            const lesson = await lessonModel.create(req.body);
            return res.json(lesson);
        } catch (e) {
            console.error(e);  // Логируем ошибку на сервере
            next(ApiError.internal('Произошла ошибка при создании лекции.'));
        }
    }

    // Получение всех лекций курса
    async getAll(req, res, next) {
        try {
            const { course } = req.params;
            const lessonModel = getLessonModel(course);
            const lessons = await lessonModel.findAll();
            return res.json(lessons);
        } catch (e) {
            console.error(e);  // Логируем ошибку на сервере
            next(ApiError.internal('Произошла ошибка при получении лекций.'));
        }
    }

    // Получение лекции по ID
    async getById(req, res, next) {
        try {
            const { course, id } = req.params;
            const lessonModel = getLessonModel(course);
            const lesson = await lessonModel.findByPk(id);
            if (!lesson) {
                return next(ApiError.notFound(`Лекция с ID ${id} не найдена в курсе ${course}.`));
            }
            return res.json(lesson);
        } catch (e) {
            console.error(e);  // Логируем ошибку на сервере
            next(ApiError.internal('Произошла ошибка при получении лекции.'));
        }
    }

    // Обновление лекции
    async update(req, res, next) {
        try {
            const { course, id } = req.params;
            const lessonModel = getLessonModel(course);
            const [updated] = await lessonModel.update(req.body, { where: { id_classes: id } });
            if (!updated) {
                return next(ApiError.notFound(`Лекция с ID ${id} не найдена.`));
            }
            const updatedLesson = await lessonModel.findByPk(id);
            return res.json(updatedLesson);
        } catch (e) {
            console.error(e);  // Логируем ошибку на сервере
            next(ApiError.internal('Произошла ошибка при обновлении лекции.'));
        }
    }

    // Удаление лекции
    async delete(req, res, next) {
        try {
            const { course, id } = req.params;
            const lessonModel = getLessonModel(course);
            const deleted = await lessonModel.destroy({ where: { id_classes: id } });
            if (!deleted) {
                return next(ApiError.notFound(`Лекция с ID ${id} не найдена.`));
            }
            return res.json({ message: 'Лекция успешно удалена.' });
        } catch (e) {
            console.error(e);  // Логируем ошибку на сервере
            next(ApiError.internal('Произошла ошибка при удалении лекции.'));
        }
    }
}

module.exports = new LessonController();
