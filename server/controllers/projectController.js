const { Project } = require('../models/models'); // Проверьте путь к модели
const ApiError = require('../error/ApiError');

class ProjectController {
    // Создать проект
    async createProject(req, res, next) {
        try {
            const { id_user, deadlines, name, id_emulator } = req.body;

            // Проверка обязательных полей
            if (!id_user || !name) {
                return next(ApiError.badRequest('Поля id_user и name обязательны'));
            }

            const newProject = await Project.create({
                id_user,
                deadlines,
                name,
                id_emulator,
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
            const projects = await Project.findAll();
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

            const project = await Project.findByPk(id);

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
            const { id_user, deadlines, name, id_emulator } = req.body;

            const project = await Project.findByPk(id);

            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }

            await project.update({
                id_user: id_user || project.id_user,
                deadlines: deadlines || project.deadlines,
                name: name || project.name,
                id_emulator: id_emulator || project.id_emulator,
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

            const deleted = await Project.destroy({ where: { id_project: id } });

            if (!deleted) {
                return next(ApiError.notFound('Проект не найден'));
            }

            res.status(200).json({ message: 'Проект успешно удалён' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления проекта'));
        }
    }
}

module.exports = new ProjectController();