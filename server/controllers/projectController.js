const { ProjectIoT } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class ProjectController {
    // Создать проект
    async createProject(req, res, next) {
        try {
            const { project_name, team_members, description } = req.body;

            // Проверка обязательных полей
            if (!project_name || !team_members) {
                return next(ApiError.badRequest('Поля project_name и team_members обязательны'));
            }

            const newProject = await ProjectIoT.create({
                project_name,
                team_members,
                description,
            });

            res.status(201).json(newProject);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания проекта'));
        }
    }

    // Получить все проекты
    async getProjects(req, res, next) {
        try {
            const projects = await ProjectIoT.findAll();
            res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения проектов'));
        }
    }

    // Получить проект по ID
    async getProjectById(req, res, next) {
        try {
            const { id } = req.params;
            const project = await ProjectIoT.findByPk(id);

            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }

            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения проекта'));
        }
    }

    // Обновить проект
    async updateProject(req, res, next) {
        try {
            const { id } = req.params;
            const { project_name, team_members, description } = req.body;

            const project = await ProjectIoT.findByPk(id);

            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }

            await project.update({
                project_name: project_name || project.project_name,
                team_members: team_members || project.team_members,
                description: description || project.description,
            });

            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления проекта'));
        }
    }

    // Удалить проект
    async deleteProject(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await ProjectIoT.destroy({ where: { id } });

            if (!deleted) {
                return next(ApiError.notFound('Проект не найден'));
            }

            res.status(200).json({ message: 'Проект успешно удален' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления проекта'));
        }
    }
}

module.exports = new ProjectController();