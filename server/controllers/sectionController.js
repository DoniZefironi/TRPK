const { ForumSectionElectric, ForumSectionIoT, ForumSectionScholl } = require('../models/models');
const ApiError = require('../error/ApiError');

class SectionController {
  async addSection(req, res, next) {
    try {
      const { type, name, subsections, moderators, id_user } = req.body;

      if (!type || !name) {
        return next(ApiError.badRequest('Поля "type" и "name" обязательны'));
      }

      let newSection;

      switch (type) {
        case 'electric':
          newSection = await ForumSectionElectric.create({ name, subsections, moderators, id_user });
          break;
        case 'iot':
          newSection = await ForumSectionIoT.create({ subsections, posts: '', moderators, id_user });
          break;
        case 'school':
          newSection = await ForumSectionScholl.create({ name, subsections, topic_subsections: '', moderators, id_user });
          break;
        default:
          return next(ApiError.badRequest('Некорректный тип секции'));
      }

      res.status(201).json(newSection);
    } catch (error) {
      console.error(error);
      next(ApiError.internal('Ошибка добавления секции'));
    }
  }
}

module.exports = new SectionController();
