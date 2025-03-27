const { ForumSectionElectric, ForumSectionIoT, ForumSectionScholl } = require('../models/models');

class TopicController {
  async createTopic(req, res, next) {
    try {
      const { title, description, id_section, section_type, id_user } = req.body;

      if (!title || !id_section || !section_type) {
        return next(ApiError.badRequest('Поля title, id_section и section_type обязательны'));
      }

      // Проверяем секцию по ее типу
      let section;
      switch (section_type) {
        case 'electric':
          section = await ForumSectionElectric.findByPk(id_section);
          break;
        case 'iot':
          section = await ForumSectionIoT.findByPk(id_section);
          break;
        case 'school':
          section = await ForumSectionScholl.findByPk(id_section);
          break;
        default:
          return next(ApiError.badRequest('Некорректный тип секции'));
      }

      if (!section) {
        return next(ApiError.badRequest('Секция не найдена'));
      }

      // Создаем тему
      const newTopic = await ForumTopic.create({ title, description, id_section, id_user });
      res.status(201).json(newTopic);
    } catch (error) {
      console.error(error);
      next(ApiError.internal('Ошибка создания темы'));
    }
  }

  async getTopics(req, res, next) {
    try {
      const { id_section } = req.params;

      const topics = await ForumTopic.findAll({ where: { id_section } });
      res.status(200).json(topics);
    } catch (error) {
      console.error(error);
      next(ApiError.internal('Ошибка получения тем'));
    }
  }
}
module.exports = new TopicController();
