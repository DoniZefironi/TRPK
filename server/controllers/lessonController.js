const { ClassesElectric, LessonInformatics, LectureIoT, MaterialsLibrary } = require('../models/models');
const ApiError = require('../error/ApiError');

const getLessonModel = (course) => {
    switch (course) {
        case 'electronics': return ClassesElectric;
        case 'iot': return LectureIoT;
        case 'informatics': return LessonInformatics;
        default: return null;
    }
};

class LessonController {

    // Создание урока или лекции
    async createLesson(req, res) {
        try {
            const { course, title, topic, description, id_materials, time, date } = req.body;
            const lessonModel = getLessonModel(course);

            if (!lessonModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const newLesson = await lessonModel.create({ title, topic, description, id_materials, time, date });
            res.status(201).json(newLesson);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Получение всех уроков или лекций
    async getLessons(req, res) {
        try {
            const { course } = req.params;
            const lessonModel = getLessonModel(course);

            if (!lessonModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const lessons = await lessonModel.findAll({ include: [MaterialsLibrary] });
            res.status(200).json(lessons);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Обновление урока или лекции
    async updateLesson(req, res) {
        try {
            const { course, id } = req.params;
            const { title, topic, description, id_materials, time, date } = req.body;
            const lessonModel = getLessonModel(course);

            if (!lessonModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const lesson = await lessonModel.findByPk(id);
            if (!lesson) return res.status(404).json({ error: 'Урок/лекция не найдены' });

            await lesson.update({ title, topic, description, id_materials, time, date });
            res.status(200).json({ message: 'Обновление успешно', lesson });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Удаление урока или лекции
    async deleteLesson(req, res) {
        try {
            const { course, id } = req.params;
            const lessonModel = getLessonModel(course);

            if (!lessonModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const lesson = await lessonModel.findByPk(id);
            if (!lesson) return res.status(404).json({ error: 'Урок/лекция не найдены' });

            await lesson.destroy();
            res.status(200).json({ message: 'Удаление успешно' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LessonController();
