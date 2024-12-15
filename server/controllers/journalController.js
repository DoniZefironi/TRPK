const { Journal } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class JournalController {
    // Создать запись журнала
    async createJournal(req, res, next) {
        try {
            const { id_class, grades, id_lesson, change_date } = req.body;

            if (!id_class || !id_lesson) {
                return next(ApiError.badRequest('Поля id_class и id_lesson обязательны'));
            }

            const newJournal = await Journal.create({
                id_class,
                grades, // JSONB поле
                id_lesson,
                change_date,
            });

            res.status(201).json(newJournal);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания записи журнала'));
        }
    }

    // Получить все записи журнала
    async getJournals(req, res, next) {
        try {
            const journals = await Journal.findAll();
            res.status(200).json(journals);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения записей журнала'));
        }
    }

    // Получить запись журнала по ID
    async getJournalById(req, res, next) {
        try {
            const { id } = req.params;
            const journal = await Journal.findByPk(id);

            if (!journal) {
                return next(ApiError.notFound('Запись журнала не найдена'));
            }

            res.status(200).json(journal);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения записи журнала'));
        }
    }

    // Обновить запись журнала
    async updateJournal(req, res, next) {
        try {
            const { id } = req.params;
            const { id_class, grades, id_lesson, change_date } = req.body;

            const journal = await Journal.findByPk(id);

            if (!journal) {
                return next(ApiError.notFound('Запись журнала не найдена'));
            }

            // Обновить JSONB поле и другие данные
            await journal.update({
                id_class: id_class !== undefined ? id_class : journal.id_class,
                grades: grades !== undefined ? grades : journal.grades, // Обновляем JSONB
                id_lesson: id_lesson !== undefined ? id_lesson : journal.id_lesson,
                change_date: change_date !== undefined ? change_date : journal.change_date,
            });

            res.status(200).json(journal);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления записи журнала'));
        }
    }

    // Удалить запись журнала
    async deleteJournal(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Journal.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Запись журнала не найдена'));
            }

            res.status(200).json({ message: 'Запись журнала успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления записи журнала'));
        }
    }
}

module.exports = new JournalController();
