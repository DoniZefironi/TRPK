const models = require('../models/models');
const ApiError = require('../error/ApiError');

class InternshipProgramController {
    // Создание программы стажировки
    async create(req, res, next) {
        try {
            const { 
                program_name, 
                program_description, 
                program_duration,
                start_date_application,
                end_date_application,
                program_capacity,
                requirements,
                specialization
            } = req.body;
            
            if (!program_name || !start_date_application || !end_date_application) {
                return next(ApiError.badRequest('Не указаны обязательные поля: program_name, start_date_application, end_date_application'));
            }

            const program = await models.InternshipProgramIoT.create({
                program_name,
                program_description: program_description || null,
                program_duration: program_duration || null,
                start_date_application,
                end_date_application,
                program_capacity: program_capacity || null,
                requirements: requirements || null,
                specialization: specialization || null
            });

            return res.status(201).json({
                success: true,
                data: program,
                message: 'Программа стажировки успешно создана'
            });
        } catch (e) {
            console.error('Ошибка при создании программы:', e);
            next(ApiError.internal('Не удалось создать программу стажировки'));
        }
    }

    // Получение всех программ с пагинацией
    async getAll(req, res, next) {
        try {
            let { page = 1, limit = 10, active, search } = req.query;
            
            const where = {};
            if (active === 'true') {
                where.start_date_application = { [Op.lte]: new Date() };
                where.end_date_application = { [Op.gte]: new Date() };
            }
            if (search) {
                where[Op.or] = [
                    { program_name: { [Op.iLike]: `%${search}%` } },
                    { program_description: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const { count, rows: programs } = await models.InternshipProgramIoT.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                order: [['start_date_application', 'DESC']]
            });

            return res.json({
                success: true,
                data: programs,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (e) {
            console.error('Ошибка при получении программ:', e);
            next(ApiError.internal('Не удалось получить программы стажировки'));
        }
    }

    // Получение конкретной программы
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            
            const program = await models.InternshipProgramIoT.findByPk(id, {
                include: [{
                    model: models.InternshipApplicationIoT,
                    as: 'applications',
                    attributes: ['application_id', 'application_status', 'application_date'],
                    include: [{
                        model: models.User,
                        attributes: ['id_user', 'username', 'email']
                    }]
                }]
            });

            if (!program) {
                return next(ApiError.notFound('Программа не найдена'));
            }

            return res.json({
                success: true,
                data: program
            });
        } catch (e) {
            console.error('Ошибка при получении программы:', e);
            next(ApiError.internal('Не удалось получить программу стажировки'));
        }
    }

    // Обновление программы
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;
            
            const program = await models.InternshipProgramIoT.findByPk(id);
            if (!program) {
                return next(ApiError.notFound('Программа не найдена'));
            }

            await program.update(updates);

            return res.json({
                success: true,
                data: program,
                message: 'Программа успешно обновлена'
            });
        } catch (e) {
            console.error('Ошибка при обновлении программы:', e);
            next(ApiError.internal('Не удалось обновить программу стажировки'));
        }
    }

    // Удаление программы
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            const program = await models.InternshipProgramIoT.findByPk(id);
            if (!program) {
                return next(ApiError.notFound('Программа не найдена'));
            }

            await program.destroy();
            return res.json({
                success: true,
                message: 'Программа успешно удалена'
            });
        } catch (e) {
            console.error('Ошибка при удалении программы:', e);
            next(ApiError.internal('Не удалось удалить программу стажировки'));
        }
    }

    // Получение активных программ
    async getActive(req, res, next) {
        try {
            const programs = await models.InternshipProgramIoT.findAll({
                where: {
                    start_date_application: { [Op.lte]: new Date() },
                    end_date_application: { [Op.gte]: new Date() }
                },
                order: [['end_date_application', 'ASC']]
            });

            return res.json({
                success: true,
                data: programs
            });
        } catch (e) {
            console.error('Ошибка при получении активных программ:', e);
            next(ApiError.internal('Не удалось получить активные программы стажировки'));
        }
    }
}

module.exports = new InternshipProgramController();