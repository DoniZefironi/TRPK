const models = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

    // Получение модели соревнования по типу
    const getCompetitionModel = (type) => {
        const modelsMap = {
            'hackathon': models.HackathonElectric,
            'olympiad': models.OlympiadInformatics
        };
        return modelsMap[type.toLowerCase()] || null;
    };

    // Получение модели результатов по типу
    const getResultsModel = (type) => {
        const modelsMap = {
            'hackathon': models.HackathonResultsElectric,
            'olympiad': models.OlympiadResultsInformatics
        };
        return modelsMap[type.toLowerCase()] || null;
    };

class CompetitionController {

    // Создание соревнования
    async createCompetition(req, res, next) {
        try {
            const { type } = req.params;
            const { name, topic, date, organizers, description } = req.body;
            
            const competitionModel = getCompetitionModel(type);
            if (!competitionModel) {
                return next(ApiError.badRequest('Недопустимый тип соревнования'));
            }

            // Валидация обязательных полей
            if (!name || !topic || !date) {
                return next(ApiError.badRequest('Не указаны обязательные поля: name, topic, date'));
            }

            const newCompetition = await competitionModel.create({ 
                name, 
                topic, 
                date, 
                organizers: organizers || null,
                description: description || null
            });

            return res.status(201).json({
                success: true,
                data: newCompetition,
                message: 'Соревнование успешно создано'
            });
        } catch (e) {
            console.error('Ошибка при создании соревнования:', e);
            next(ApiError.internal('Не удалось создать соревнование'));
        }
    }

    // Получение списка соревнований с пагинацией
    async getCompetitions(req, res, next) {
        try {
            const { type } = req.params;
            let { page = 1, limit = 10, upcoming, search } = req.query;
            
            const competitionModel = getCompetitionModel(type);
            if (!competitionModel) {
                return next(ApiError.badRequest('Недопустимый тип соревнования'));
            }

            // Подготовка условий поиска
            const where = {};
            if (upcoming === 'true') {
                where.date = { [Op.gte]: new Date() };
            } else if (upcoming === 'false') {
                where.date = { [Op.lt]: new Date() };
            }
            
            if (search) {
                where[Op.or] = [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { topic: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const { count, rows: competitions } = await competitionModel.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                order: [['date', upcoming === 'true' ? 'ASC' : 'DESC']],
                include: [{
                    model: getResultsModel(type),
                    as: 'results',
                    attributes: ['id'],
                    required: false
                }]
            });

            // Добавляем количество участников к каждому соревнованию
            const competitionsWithStats = competitions.map(comp => ({
                ...comp.get({ plain: true }),
                participantsCount: comp.results?.length || 0
            }));

            return res.json({
                success: true,
                data: competitionsWithStats,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (e) {
            console.error('Ошибка при получении соревнований:', e);
            next(ApiError.internal('Не удалось получить список соревнований'));
        }
    }

    // Получение информации о соревновании
    async getCompetition(req, res, next) {
        try {
            const { type, id } = req.params;
            
            const competitionModel = getCompetitionModel(type);
            if (!competitionModel) {
                return next(ApiError.badRequest('Недопустимый тип соревнования'));
            }

            const competition = await competitionModel.findByPk(id, {
                include: [{
                    model: getResultsModel(type),
                    as: 'results',
                    order: [['position', 'ASC']],
                    include: [{
                        model: models.User,
                        as: 'participants',
                        attributes: ['id_user', 'username', 'avatar'],
                        through: { attributes: [] }
                    }]
                }]
            });

            if (!competition) {
                return next(ApiError.notFound('Соревнование не найдено'));
            }

            return res.json({
                success: true,
                data: competition
            });
        } catch (e) {
            console.error('Ошибка при получении соревнования:', e);
            next(ApiError.internal('Не удалось получить информацию о соревновании'));
        }
    }

    // Обновление соревнования
    async updateCompetition(req, res, next) {
        try {
            const { type, id } = req.params;
            const { name, topic, date, organizers, description } = req.body;
            
            const competitionModel = this.getCompetitionModel(type);
            if (!competitionModel) {
                return next(ApiError.badRequest('Недопустимый тип соревнования'));
            }

            const competition = await competitionModel.findByPk(id);
            if (!competition) {
                return next(ApiError.notFound('Соревнование не найдено'));
            }

            await competition.update({ 
                name: name || competition.name,
                topic: topic || competition.topic,
                date: date || competition.date,
                organizers: organizers || competition.organizers,
                description: description || competition.description
            });

            return res.json({
                success: true,
                data: competition,
                message: 'Соревнование успешно обновлено'
            });
        } catch (e) {
            console.error('Ошибка при обновлении соревнования:', e);
            next(ApiError.internal('Не удалось обновить соревнование'));
        }
    }

    // Удаление соревнования
    async deleteCompetition(req, res, next) {
        try {
            const { type, id } = req.params;
            
            const competitionModel = getCompetitionModel(type);
            if (!competitionModel) {
                return next(ApiError.badRequest('Недопустимый тип соревнования'));
            }

            const competition = await competitionModel.findByPk(id, {
                include: [{
                    model: this.getResultsModel(type),
                    as: 'results',
                    required: false
                }]
            });

            if (!competition) {
                return next(ApiError.notFound('Соревнование не найдено'));
            }

            // Проверка наличия результатов
            if (competition.results?.length > 0) {
                return next(ApiError.badRequest('Невозможно удалить соревнование, так как в нем есть результаты'));
            }

            await competition.destroy();
            return res.json({
                success: true,
                message: 'Соревнование успешно удалено'
            });
        } catch (e) {
            console.error('Ошибка при удалении соревнования:', e);
            next(ApiError.internal('Не удалось удалить соревнование'));
        }
    }

    // Добавление результата соревнования
    async addResult(req, res, next) {
        try {
            const { type } = req.params;
            const { id_competition, team_name, project_name, score, position, participants } = req.body;
            
            const resultsModel = getResultsModel(type);
            if (!resultsModel) {
                return next(ApiError.badRequest('Недопустимый тип соревнования'));
            }
    
            // Валидация обязательных полей
            if (!id_competition || !team_name || score === undefined || position === undefined) {
                return next(ApiError.badRequest('Не указаны обязательные поля: id_competition, team_name, score, position'));
            }
    
            // Проверка существования соревнования
            const competitionModel = getCompetitionModel(type);
            const competition = await competitionModel.findByPk(id_competition);
            if (!competition) {
                return next(ApiError.notFound('Соревнование не найдено'));
            }
    
            const result = await resultsModel.create({ 
                id_competition, 
                team_name, 
                project_name: project_name || null,
                score, 
                position 
            });
    
            // Добавление участников (если указаны)
            if (participants && participants.length > 0) {
                const validUsers = await models.User.findAll({
                    where: { id_user: participants }
                });
                
                if (validUsers.length > 0) {
                    const ParticipantModel = type === 'hackathon' ? 
                        models.HackathonParticipants : 
                        models.OlympiadParticipants;
                    
                    const now = new Date();
                    await ParticipantModel.bulkCreate(
                        validUsers.map(user => ({
                            result_id: result.id_result,
                            user_id: user.id_user,
                            createdAt: now,
                            updatedAt: now
                        }))
                    );
                }
            }
    
            // Получаем результат с информацией об участниках
            const fullResult = await resultsModel.findByPk(result.id_result, {
                include: [{
                    model: models.User,
                    as: 'participants',
                    attributes: ['id_user', 'username', 'avatar'],
                    through: { attributes: [] }
                }]
            });
    
            return res.status(201).json({
                success: true,
                data: fullResult,
                message: 'Результат успешно добавлен'
            });
        } catch (e) {
            console.error('Ошибка при добавлении результата:', e);
            next(ApiError.internal('Не удалось добавить результат'));
        }
    }

    // Получение результатов соревнования
    async getResults(req, res, next) {
        try {
            const { type, id_competition } = req.params;
            let { top } = req.query;
            
            const resultsModel = getResultsModel(type);
            if (!resultsModel) {
                return next(ApiError.badRequest('Недопустимый тип соревнования'));
            }

            const where = { id_competition };
            const order = [['position', 'ASC']];
            const limit = top ? parseInt(top) : undefined;

            const results = await resultsModel.findAll({
                where,
                order,
                limit,
                include: [{
                    model: models.User,
                    as: 'participants',
                    attributes: ['id_user', 'username', 'avatar'],
                    through: { attributes: [] }
                }]
            });

            return res.json({
                success: true,
                data: results
            });
        } catch (e) {
            console.error('Ошибка при получении результатов:', e);
            next(ApiError.internal('Не удалось получить результаты'));
        }
    }
}

module.exports = new CompetitionController();