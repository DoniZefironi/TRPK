const { IoTJournal } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class JournalController {
    // Создать запись журнала
    async createJournal(req, res, next) {
        try {
            const { id_group, grades, id_classes, change_date, academic_performance } = req.body;

            // Проверка обязательных полей
            if (!id_group || !id_classes) {
                return next(ApiError.badRequest('Поля id_group и id_classes обязательны'));
            }

            const newJournal = await IoTJournal.create({
                id_group,
                grades,
                id_classes,
                change_date,
                academic_performance,
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
            const journals = await IoTJournal.findAll();
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
            const journal = await IoTJournal.findByPk(id);

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
            const { id_group, grades, id_classes, change_date, academic_performance } = req.body;

            const journal = await IoTJournal.findByPk(id);

            if (!journal) {
                return next(ApiError.notFound('Запись журнала не найдена'));
            }

            await journal.update({
                id_group: id_group || journal.id_group,
                grades: grades || journal.grades,
                id_classes: id_classes || journal.id_classes,
                change_date: change_date || journal.change_date,
                academic_performance: academic_performance || journal.academic_performance,
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

            const deleted = await IoTJournal.destroy({ where: { id } });

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