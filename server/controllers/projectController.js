const { ProjectElectric, ProjectIoT } = require('../models/models');
const ApiError = require('../error/ApiError');

// Помощник для получения модели проекта по курсу
const getProjectModel = (course) => {
  const modelsMap = {
    electric: ProjectElectric,
    iot: ProjectIoT
  };
  return modelsMap[course.toLowerCase()] || null;
};

// Создание проекта
const createProject = async (req, res, next) => {
  const { name, description, deadlines, course } = req.body;
  const projectModel = getProjectModel(course);

  if (!projectModel) {
    return next(ApiError.badRequest('Неверный курс'));
  }

  try {
    const project = await projectModel.create({ name, description, deadlines });
    return res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return next(ApiError.internal('Ошибка при создании проекта'));
  }
};

// Получение всех проектов
const getProjects = async (req, res, next) => {
  const { course } = req.query;
  const projectModel = getProjectModel(course);

  if (!projectModel) {
    return next(ApiError.badRequest('Неверный курс'));
  }

  try {
    const projects = await projectModel.findAll();
    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return next(ApiError.internal('Ошибка при получении проектов'));
  }
};

// Получение проекта по id
const getProjectById = async (req, res, next) => {
  const { id } = req.params;
  const { course } = req.query;
  const projectModel = getProjectModel(course);

  if (!projectModel) {
    return next(ApiError.badRequest('Неверный курс'));
  }

  try {
    const project = await projectModel.findByPk(id);
    if (!project) {
      return next(ApiError.notFound('Проект не найден'));
    }
    return res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return next(ApiError.internal('Ошибка при получении проекта'));
  }
};

// Обновление проекта
const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, deadlines, course } = req.body;
  const projectModel = getProjectModel(course);

  if (!projectModel) {
    return next(ApiError.badRequest('Неверный курс'));
  }

  try {
    const project = await projectModel.findByPk(id);
    if (!project) {
      return next(ApiError.notFound('Проект не найден'));
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.deadlines = deadlines || project.deadlines;

    await project.save();
    return res.status(200).json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return next(ApiError.internal('Ошибка при обновлении проекта'));
  }
};

// Удаление проекта
const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  const { course } = req.query;
  const projectModel = getProjectModel(course);

  if (!projectModel) {
    return next(ApiError.badRequest('Неверный курс'));
  }

  try {
    const project = await projectModel.findByPk(id);
    if (!project) {
      return next(ApiError.notFound('Проект не найден'));
    }

    await project.destroy();
    return res.status(200).json({ message: 'Проект успешно удалён' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return next(ApiError.internal('Ошибка при удалении проекта'));
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};
