const { LectureIoT } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class LectureController {
    // Создать лекцию
    async createLecture(req, res, next) {
        try {
            const { lecture_title, slides, duration } = req.body;

            // Проверка обязательных полей
            if (!lecture_title || !duration) {
                return next(ApiError.badRequest('Поля lecture_title и duration обязательны'));
            }

            const newLecture = await LectureIoT.create({
                lecture_title,
                slides,
                duration,
            });

            res.status(201).json(newLecture);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания лекции'));
        }
    }

    // Получить все лекции
    async getLectures(req, res, next) {
        try {
            const lectures = await LectureIoT.findAll();
            res.status(200).json(lectures);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения лекций'));
        }
    }

    // Получить лекцию по ID
    async getLectureById(req, res, next) {
        try {
            const { id } = req.params;
            const lecture = await LectureIoT.findByPk(id);

            if (!lecture) {
                return next(ApiError.notFound('Лекция не найдена'));
            }

            res.status(200).json(lecture);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения лекции'));
        }
    }

    // Обновить лекцию
    async updateLecture(req, res, next) {
        try {
            const { id } = req.params;
            const { lecture_title, slides, duration } = req.body;

            const lecture = await LectureIoT.findByPk(id);

            if (!lecture) {
                return next(ApiError.notFound('Лекция не найдена'));
            }

            await lecture.update({
                lecture_title: lecture_title || lecture.lecture_title,
                slides: slides || lecture.slides,
                duration: duration || lecture.duration,
            });

            res.status(200).json(lecture);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления лекции'));
        }
    }

    // Удалить лекцию
    async deleteLecture(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await LectureIoT.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Лекция не найдена'));
            }

            res.status(200).json({ message: 'Лекция успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления лекции'));
        }
    }
}

module.exports = new LectureController();