const models = require('../models/models');
const ApiError = require('../error/ApiError');

class ElectiveInformaticsController {
    // Создание факультатива
    async create(req, res, next) {
        try {
            const { name, topic_elective, participants } = req.body;
            
            if (!name) {
                return next(ApiError.badRequest('Не указано обязательное поле: name'));
            }

            const elective = await models.ElectiveInformatics.create({
                name,
                topic_elective: topic_elective || null
            });

            // Добавляем участников, если они указаны
            if (participants && participants.length > 0) {
                await elective.addParticipants(participants);
            }

            // Получаем факультатив с участниками для ответа
            const createdElective = await models.ElectiveInformatics.findByPk(elective.id_elective, {
                include: [{
                    model: models.User,
                    as: 'participants',
                    attributes: ['id_user', 'username', 'avatar'],
                    through: { attributes: [] }
                }]
            });

            return res.status(201).json({
                success: true,
                data: createdElective,
                message: 'Факультатив успешно создан'
            });
        } catch (e) {
            console.error('Ошибка при создании факультатива:', e);
            next(ApiError.internal('Не удалось создать факультатив'));
        }
    }

    // Получение списка факультативов
    async getAll(req, res, next) {
        try {
            let { page = 1, limit = 10, search } = req.query;
            const { Op } = require('sequelize');
            
            const where = {};
            if (search) {
                where[Op.or] = [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { topic_elective: { [Op.iLike]: `%${search}%` } }
                ];
            }
    
            const { count, rows: electives } = await models.ElectiveInformatics.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                order: [['name', 'ASC']],
                include: [{
                    model: models.User,
                    as: 'participants',
                    attributes: ['id_user', 'username', 'avatar'],
                    through: { attributes: [] } // Не включать атрибуты промежуточной таблицы
                }]
            });
    
            return res.json({
                success: true,
                data: electives,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (e) {
            console.error('Ошибка при получении факультативов:', e);
            next(ApiError.internal('Не удалось получить список факультативов'));
        }
    }

    // Получение информации о факультативе
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            
            const elective = await models.ElectiveInformatics.findByPk(id, {
                include: [{
                    model: models.User,
                    as: 'participants',
                    attributes: ['id_user', 'username', 'avatar', 'email'],
                    through: { attributes: [] }
                }]
            });

            if (!elective) {
                return next(ApiError.notFound('Факультатив не найден'));
            }

            return res.json({
                success: true,
                data: elective
            });
        } catch (e) {
            console.error('Ошибка при получении факультатива:', e);
            next(ApiError.internal('Не удалось получить информацию о факультативе'));
        }
    }

    // Обновление факультатива
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, topic_elective, participants } = req.body;
            
            const elective = await models.ElectiveInformatics.findByPk(id);
            if (!elective) {
                return next(ApiError.notFound('Факультатив не найден'));
            }

            await elective.update({ 
                name: name || elective.name,
                topic_elective: topic_elective !== undefined ? topic_elective : elective.topic_elective
            });

            // Обновляем список участников, если он предоставлен
            if (participants !== undefined) {
                await elective.setParticipants(participants || []);
            }

            return res.json({
                success: true,
                data: elective,
                message: 'Факультатив успешно обновлен'
            });
        } catch (e) {
            console.error('Ошибка при обновлении факультатива:', e);
            next(ApiError.internal('Не удалось обновить факультатив'));
        }
    }

    // Удаление факультатива
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            const elective = await models.ElectiveInformatics.findByPk(id);
            if (!elective) {
                return next(ApiError.notFound('Факультатив не найден'));
            }

            await elective.destroy();
            return res.json({
                success: true,
                message: 'Факультатив успешно удален'
            });
        } catch (e) {
            console.error('Ошибка при удалении факультатива:', e);
            next(ApiError.internal('Не удалось удалить факультатив'));
        }
    }

    // Добавление участника в факультатив
    async addParticipant(req, res, next) {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            
            const elective = await models.ElectiveInformatics.findByPk(id);
            if (!elective) {
                return next(ApiError.notFound('Факультатив не найден'));
            }

            const user = await models.User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }

            // Проверяем, не является ли пользователь уже участником
            const isParticipant = await elective.hasParticipant(user);
            if (isParticipant) {
                return next(ApiError.badRequest('Пользователь уже является участником этого факультатива'));
            }

            // Добавляем пользователя к факультативу
            await elective.addParticipant(user);

            // Получаем обновленные данные факультатива
            const updatedElective = await models.ElectiveInformatics.findByPk(id, {
                include: [{
                    model: models.User,
                    as: 'participants',
                    attributes: ['id_user', 'username', 'avatar'],
                    through: { attributes: [] }
                }]
            });

            return res.json({
                success: true,
                data: updatedElective,
                message: 'Участник успешно добавлен в факультатив'
            });
        } catch (e) {
            console.error('Ошибка при добавлении участника:', e);
            next(ApiError.internal('Не удалось добавить участника в факультатив'));
        }
    }

    // Удаление участника из факультатива
    async removeParticipant(req, res, next) {
        try {
            const { id, userId } = req.params;
            
            const elective = await models.ElectiveInformatics.findByPk(id);
            if (!elective) {
                return next(ApiError.notFound('Факультатив не найден'));
            }

            const user = await models.User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }

            // Проверяем, является ли пользователь участником
            const isParticipant = await elective.hasParticipant(user);
            if (!isParticipant) {
                return next(ApiError.badRequest('Пользователь не является участником этого факультатива'));
            }

            // Удаляем пользователя из факультатива
            await elective.removeParticipant(user);

            // Получаем обновленные данные факультатива
            const updatedElective = await models.ElectiveInformatics.findByPk(id, {
                include: [{
                    model: models.User,
                    as: 'participants',
                    attributes: ['id_user', 'username', 'avatar'],
                    through: { attributes: [] }
                }]
            });

            return res.json({
                success: true,
                data: updatedElective,
                message: 'Участник успешно удален из факультатива'
            });
        } catch (e) {
            console.error('Ошибка при удалении участника:', e);
            next(ApiError.internal('Не удалось удалить участника из факультатива'));
        }
    }
}

module.exports = new ElectiveInformaticsController();