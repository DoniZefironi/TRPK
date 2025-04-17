const { ProjectElectric, ProjectIoT } = require('../models/models');
const ApiError = require('../error/ApiError');

const getProjectModel = (course) => {
    switch (course) {
        case 'electronics': return ProjectElectric;
        case 'iot': return ProjectIoT;
        default: return null;
    }
};

class ProjectController {

    // Создание проекта
    async createProject(req, res) {
        try {
            const { course, name, description, deadlines, status } = req.body;
            const projectModel = getProjectModel(course);

            if (!projectModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const newProject = await projectModel.create({ name, description, deadlines, status });
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Получение всех проектов
    async getProjects(req, res) {
        try {
            const { course } = req.params;
            const projectModel = getProjectModel(course);

            if (!projectModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const projects = await projectModel.findAll();
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Обновление проекта
    async updateProject(req, res) {
        try {
            const { course, id } = req.params;
            const { name, description, deadlines, status } = req.body;
            const projectModel = getProjectModel(course);

            if (!projectModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const project = await projectModel.findByPk(id);
            if (!project) return res.status(404).json({ error: 'Проект не найден' });

            await project.update({ name, description, deadlines, status });
            res.status(200).json({ message: 'Обновление успешно', project });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Удаление проекта
    async deleteProject(req, res) {
        try {
            const { course, id } = req.params;
            const projectModel = getProjectModel(course);

            if (!projectModel) {
                return res.status(400).json({ error: 'Недопустимый курс' });
            }

            const project = await projectModel.findByPk(id);
            if (!project) return res.status(404).json({ error: 'Проект не найден' });

            await project.destroy();
            res.status(200).json({ message: 'Удаление успешно' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProjectController();
