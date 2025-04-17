const { HackathonElectric, HackathonResultsElectric, OlympiadInformatics, OlympiadResultsInformatics, User } = require('../models/models');
const ApiError = require('../error/ApiError');

// Определяем модель в зависимости от типа соревнования
const getCompetitionModel = (type) => {
    switch (type) {
        case 'hackathon': return HackathonElectric;
        case 'olympiad': return OlympiadInformatics;
        default: return null;
    }
};

const getResultsModel = (type) => {
    switch (type) {
        case 'hackathon': return HackathonResultsElectric;
        case 'olympiad': return OlympiadResultsInformatics;
        default: return null;
    }
};

class CompetitionController {

    // Создание хакатона или олимпиады
    async createCompetition(req, res) {
        try {
            const { type, name, topic, date, organizers } = req.body;
            const competitionModel = getCompetitionModel(type);

            if (!competitionModel) return res.status(400).json({ error: 'Недопустимый тип соревнования' });

            const newCompetition = await competitionModel.create({ name, topic, date, organizers });
            res.status(201).json(newCompetition);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Получение всех хакатонов или олимпиад
    async getCompetitions(req, res) {
        try {
            const { type } = req.params;
            const competitionModel = getCompetitionModel(type);

            if (!competitionModel) return res.status(400).json({ error: 'Недопустимый тип соревнования' });

            const competitions = await competitionModel.findAll();
            res.status(200).json(competitions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Обновление хакатона или олимпиады
    async updateCompetition(req, res) {
        try {
            const { type, id } = req.params;
            const { name, topic, date, organizers } = req.body;
            const competitionModel = getCompetitionModel(type);

            if (!competitionModel) return res.status(400).json({ error: 'Недопустимый тип соревнования' });

            const competition = await competitionModel.findByPk(id);
            if (!competition) return res.status(404).json({ error: 'Соревнование не найдено' });

            await competition.update({ name, topic, date, organizers });
            res.status(200).json({ message: 'Обновление успешно', competition });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Удаление хакатона или олимпиады
    async deleteCompetition(req, res) {
        try {
            const { type, id } = req.params;
            const competitionModel = getCompetitionModel(type);

            if (!competitionModel) return res.status(400).json({ error: 'Недопустимый тип соревнования' });

            const competition = await competitionModel.findByPk(id);
            if (!competition) return res.status(404).json({ error: 'Соревнование не найдено' });

            await competition.destroy();
            res.status(200).json({ message: 'Удаление успешно' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Добавление результата соревнования
    async addResult(req, res) {
        try {
            const { type, id_competition, team_name, project_name, score, position } = req.body;
            const resultsModel = getResultsModel(type);

            if (!resultsModel) return res.status(400).json({ error: 'Недопустимый тип соревнования' });

            const result = await resultsModel.create({ id_competition, team_name, project_name, score, position });
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Получение таблицы результатов
    async getResults(req, res) {
        try {
            const { type, id_competition } = req.params;
            const resultsModel = getResultsModel(type);

            if (!resultsModel) return res.status(400).json({ error: 'Недопустимый тип соревнования' });

            const results = await resultsModel.findAll({ where: { id_competition } });
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CompetitionController();
