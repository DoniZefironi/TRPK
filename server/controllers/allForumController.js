const { ForumSectionElectric, ForumSectionIoT, ForumSectionScholl } = require('../models/models');
const ApiError = require('../error/ApiError');

class ForumController {
  // Существующий метод для получения секций
  async getSections(req, res, next) {
    try {
      const electricSections = await ForumSectionElectric.findAll();
      const iotSections = await ForumSectionIoT.findAll();
      const schoolSections = await ForumSectionScholl.findAll();

      res.status(200).json({
        sections: {
          electric: electricSections,
          iot: iotSections,
          school: schoolSections,
        },
      });
    } catch (error) {
      console.error(error);
      next(ApiError.internal('Ошибка получения секций форума'));
    }
  }

  // Новый метод для добавления секции
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
          newSection = await ForumSectionIoT.create({ name, subsections, moderators, id_user });
          break;
        case 'school':
          newSection = await ForumSectionScholl.create({ name, subsections, moderators, id_user });
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

module.exports = new ForumController();
