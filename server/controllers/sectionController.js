const { ForumSectionElectric, ForumSectionIoT, ForumSectionScholl, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class SectionController {
  async getAll(req, res, next) {
    try {
      const electricSections = await ForumSectionElectric.findAll({
        include: [{ model: User, attributes: ['id_user', 'username', 'avatar'] }]
      });
      const iotSections = await ForumSectionIoT.findAll({
        include: [{ model: User, attributes: ['id_user', 'username', 'avatar'] }]
      });
      const schoolSections = await ForumSectionScholl.findAll({
        include: [{ model: User, attributes: ['id_user', 'username', 'avatar'] }]
      });

      res.json({ electric: electricSections, iot: iotSections, school: schoolSections });
    } catch (e) {
      next(ApiError.internal('Ошибка при получении разделов'));
    }
  }

  async create(req, res, next) {
    try {
      const { type, name, subsections, moderators, id_user } = req.body;
      
      if (!type || !name || !id_user) {
        return next(ApiError.badRequest('Не указаны обязательные поля'));
      }

      let newSection;
      const sectionData = { name, subsections: subsections || '', moderators: moderators || '', id_user };

      switch (type) {
        case 'electric':
          newSection = await ForumSectionElectric.create(sectionData);
          break;
        case 'iot':
          newSection = await ForumSectionIoT.create({ ...sectionData, posts: '', id_forum: 1 });
          break;
        case 'school':
          newSection = await ForumSectionScholl.create({ ...sectionData, topic_subsections: '', id_forum: 1 });
          break;
        default:
          return next(ApiError.badRequest('Неверный тип раздела'));
      }

      res.status(201).json(newSection);
    } catch (e) {
      next(ApiError.internal('Ошибка при создании раздела'));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id, type } = req.params;
      let section;

      switch (type) {
        case 'electric':
          section = await ForumSectionElectric.findByPk(id, {
            include: [{ model: User, attributes: ['id_user', 'username', 'avatar'] }]
          });
          break;
        case 'iot':
          section = await ForumSectionIoT.findByPk(id, {
            include: [{ model: User, attributes: ['id_user', 'username', 'avatar'] }]
          });
          break;
        case 'school':
          section = await ForumSectionScholl.findByPk(id, {
            include: [{ model: User, attributes: ['id_user', 'username', 'avatar'] }]
          });
          break;
        default:
          return next(ApiError.badRequest('Неверный тип раздела'));
      }

      if (!section) {
        return next(ApiError.notFound('Раздел не найден'));
      }

      res.json(section);
    } catch (e) {
      next(ApiError.internal('Ошибка при получении раздела'));
    }
  }
}

module.exports = new SectionController();