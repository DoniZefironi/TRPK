const { InternshipProgram } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class ProgramController {
    // Создать программу стажировки
    async createProgram(req, res, next) {
        try {
            const {
                program_name,
                program_description,
                program_duration,
                start_date_application,
                end_date_application,
                program_capacity,
                requirements,
                specialization,
            } = req.body;

            // Проверка обязательных полей
            if (!program_name || !program_duration || !start_date_application || !end_date_application) {
                return next(ApiError.badRequest('Обязательные поля: program_name, program_duration, start_date_application, end_date_application'));
            }

            const newProgram = await InternshipProgram.create({
                program_name,
                program_description,
                program_duration,
                start_date_application,
                end_date_application,
                program_capacity,
                requirements,
                specialization,
            });

            res.status(201).json(newProgram);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания программы стажировки'));
        }
    }

    // Получить все программы стажировки
    async getPrograms(req, res, next) {
        try {
            const programs = await InternshipProgram.findAll();
            res.status(200).json(programs);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения программ стажировки'));
        }
    }

    // Получить программу стажировки по ID
    async getProgramById(req, res, next) {
        try {
            const { id } = req.params;
            const program = await InternshipProgram.findByPk(id);

            if (!program) {
                return next(ApiError.notFound('Программа стажировки не найдена'));
            }

            res.status(200).json(program);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения программы стажировки'));
        }
    }

    // Обновить программу стажировки
    async updateProgram(req, res, next) {
        try {
            const { id } = req.params;
            const {
                program_name,
                program_description,
                program_duration,
                start_date_application,
                end_date_application,
                program_capacity,
                requirements,
                specialization,
            } = req.body;

            const program = await InternshipProgram.findByPk(id);

            if (!program) {
                return next(ApiError.notFound('Программа стажировки не найдена'));
            }

            // Обновляем поля
            await program.update({
                program_name: program_name || program.program_name,
                program_description: program_description || program.program_description,
                program_duration: program_duration || program.program_duration,
                start_date_application: start_date_application || program.start_date_application,
                end_date_application: end_date_application || program.end_date_application,
                program_capacity: program_capacity || program.program_capacity,
                requirements: requirements || program.requirements,
                specialization: specialization || program.specialization,
            });

            res.status(200).json(program);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления программы стажировки'));
        }
    }

    // Удалить программу стажировки
    async deleteProgram(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await InternshipProgram.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Программа стажировки не найдена'));
            }

            res.status(200).json({ message: 'Программа стажировки успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления программы стажировки'));
        }
    }
}

module.exports = new ProgramController();
