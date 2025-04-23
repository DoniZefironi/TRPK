const models = require('../models/models');
const ApiError = require('../error/ApiError');

    // Получить модель проекта по типу
    const getProjectModel = (course) => {
        if (!course) return null;
        
        const modelsMap = {
            'electric': models.ProjectElectric,
            'iot': models.ProjectIoT
        };
        return modelsMap[course.toLowerCase()] || null;
    };

class ProjectController {

    // Создание проекта
    async createProject(req, res, next) {
        try {
            const { course } = req.params;
            const { name, description, deadlines, status, creator_id } = req.body;
            if (!course) {
                return next(ApiError.badRequest('Не указан тип проекта (electric/iot)'));
            }
            const projectModel = getProjectModel(course);
            if (!projectModel) {
                return next(ApiError.badRequest('Недопустимый тип проекта'));
            }
            // Валидация обязательных полей
            if (!name || !creator_id) {
                return next(ApiError.badRequest('Не указаны обязательные поля: name, creator_id'));
            }

            const newProject = await projectModel.create({ 
                name,
                description: description || null,
                deadlines: deadlines || null,
                status: status || 'in_progress',
                creator_id
            });

            return res.status(201).json({
                success: true,
                data: newProject,
                message: 'Проект успешно создан'
            });
        } catch (e) {
            console.error('Ошибка при создании проекта:', e);
            next(ApiError.internal('Не удалось создать проект'));
        }
    }

    // Получение списка проектов с пагинацией
    async getProjects(req, res, next) {
        try {
            const { course } = req.params;
            let { page = 1, limit = 10, status, search } = req.query;
            
            const projectModel = getProjectModel(course);
            if (!projectModel) {
                return next(ApiError.badRequest('Недопустимый тип проекта'));
            }

            // Подготовка условий поиска
            const where = {};
            if (status) {
                where.status = status;
            }
            
            if (search) {
                where[Op.or] = [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const { count, rows: projects } = await projectModel.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                order: [['deadlines', 'ASC']],
                include: [{
                    model: models.User,
                    as: 'creator',
                    attributes: ['id_user', 'username', 'avatar']
                }]
            });

            return res.json({
                success: true,
                data: projects,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (e) {
            console.error('Ошибка при получении проектов:', e);
            next(ApiError.internal('Не удалось получить список проектов'));
        }
    }

    // Получение информации о проекте
    async getProject(req, res, next) {
        try {
            const { course, id } = req.params;
            
            const projectModel = getProjectModel(course);
            if (!projectModel) {
                return next(ApiError.badRequest('Недопустимый тип проекта'));
            }

            const project = await projectModel.findByPk(id, {
                include: [
                    {
                        model: models.User,
                        as: 'creator',
                        attributes: ['id_user', 'username', 'avatar', 'email']
                    },
                    {
                        model: models.User,
                        as: 'team_members',
                        attributes: ['id_user', 'username', 'avatar'],
                        through: { attributes: [] }
                    }
                ]
            });

            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }

            return res.json({
                success: true,
                data: project
            });
        } catch (e) {
            console.error('Ошибка при получении проекта:', e);
            next(ApiError.internal('Не удалось получить информацию о проекте'));
        }
    }

    // Обновление проекта
    async updateProject(req, res, next) {
        try {
            const { course, id } = req.params;
            const { name, description, deadlines, status } = req.body;
            
            const projectModel = getProjectModel(course);
            if (!projectModel) {
                return next(ApiError.badRequest('Недопустимый тип проекта'));
            }

            const project = await projectModel.findByPk(id);
            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }

            await project.update({ 
                name: name || project.name,
                description: description !== undefined ? description : project.description,
                deadlines: deadlines !== undefined ? deadlines : project.deadlines,
                status: status || project.status
            });

            return res.json({
                success: true,
                data: project,
                message: 'Проект успешно обновлен'
            });
        } catch (e) {
            console.error('Ошибка при обновлении проекта:', e);
            next(ApiError.internal('Не удалось обновить проект'));
        }
    }

    // Удаление проекта
    async deleteProject(req, res, next) {
        try {
            const { course, id } = req.params;
            
            const projectModel = getProjectModel(course);
            if (!projectModel) {
                return next(ApiError.badRequest('Недопустимый тип проекта'));
            }

            const project = await projectModel.findByPk(id);
            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }

            await project.destroy();
            return res.json({
                success: true,
                message: 'Проект успешно удален'
            });
        } catch (e) {
            console.error('Ошибка при удалении проекта:', e);
            next(ApiError.internal('Не удалось удалить проект'));
        }
    }

    // Добавление участника в проект
    async addTeamMember(req, res, next) {
        try {
            const { course, id } = req.params;
            const { userId } = req.body;
            
            const projectModel = getProjectModel(course);
            if (!projectModel) {
                return next(ApiError.badRequest('Недопустимый тип проекта'));
            }

            // Проверяем, что пользователь существует
            const user = await models.User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }

            // Проверяем, что проект существует
            const project = await projectModel.findByPk(id);
            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }

            // Добавляем участника (для моделей с ассоциацией many-to-many)
            await project.addTeam_member(user);

            return res.json({
                success: true,
                message: 'Участник успешно добавлен в проект'
            });
        } catch (e) {
            console.error('Ошибка при добавлении участника:', e);
            next(ApiError.internal('Не удалось добавить участника в проект'));
        }
    }

    // Удаление участника из проекта
    async removeTeamMember(req, res, next) {
        try {
            const { course, id, userId } = req.params;
            
            const projectModel = getProjectModel(course);
            if (!projectModel) {
                return next(ApiError.badRequest('Недопустимый тип проекта'));
            }

            // Проверяем, что пользователь существует
            const user = await models.User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }

            // Проверяем, что проект существует
            const project = await projectModel.findByPk(id);
            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }

            // Удаляем участника (для моделей с ассоциацией many-to-many)
            await project.removeTeam_member(user);

            return res.json({
                success: true,
                message: 'Участник успешно удален из проекта'
            });
        } catch (e) {
            console.error('Ошибка при удалении участника:', e);
            next(ApiError.internal('Не удалось удалить участника из проекта'));
        }
    }
}

module.exports = new ProjectController();