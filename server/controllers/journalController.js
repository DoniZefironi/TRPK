const { JournalElectric, IoTJournal, JournalInformatics, User } = require('../models/models');
const ApiError = require('../error/ApiError');

const getJournalModel = (course) => {
    switch (course) {
        case 'electronics': return JournalElectric;
        case 'iot': return IoTJournal;
        case 'informatics': return JournalInformatics;
        default: return null;
    }
};

class JournalController {

    // Добавление оценки и успеваемости студенту
    async addGrade(req, res) {
        try {
            const { course, id_user, grades, academic_performance } = req.body;
            const journalModel = getJournalModel(course);

            if (!journalModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const newEntry = await journalModel.create({ id_user, grades, academic_performance, change_date: new Date() });
            res.status(201).json(newEntry);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Получение всех записей журнала
    async getJournal(req, res) {
        try {
            const { course } = req.params;
            const journalModel = getJournalModel(course);

            if (!journalModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const journalEntries = await journalModel.findAll({ include: [User] });
            res.status(200).json(journalEntries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Обновление оценки и успеваемости
    async updateGrade(req, res) {
        try {
            const { course, id_journal } = req.params;
            const { grades, academic_performance } = req.body;
            const journalModel = getJournalModel(course);

            if (!journalModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const journalEntry = await journalModel.findByPk(id_journal);
            if (!journalEntry) {
                return res.status(404).json({ error: 'Запись журнала не найдена' });
            }

            await journalEntry.update({ grades, academic_performance, change_date: new Date() });
            res.status(200).json({ message: 'Оценка и успеваемость обновлены', journalEntry });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Удаление записи журнала
    async deleteGrade(req, res) {
        try {
            const { course, id_journal } = req.params;
            const journalModel = getJournalModel(course);

            if (!journalModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const journalEntry = await journalModel.findByPk(id_journal);
            if (!journalEntry) {
                return res.status(404).json({ error: 'Запись журнала не найдена' });
            }

            await journalEntry.destroy();
            res.status(200).json({ message: 'Запись удалена' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new JournalController();
