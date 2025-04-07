const { ForumTopic, ForumSectionElectric, ForumSectionIoT, ForumSectionScholl, User, ForumPost } = require('../models/models');
const ApiError = require('../error/ApiError');

class TopicController {
  async getBySection(req, res, next) {
    try {
      const { sectionId, sectionType } = req.params;

      // Проверка существования раздела
      let sectionExists;
      switch (sectionType) {
        case 'electric':
          sectionExists = await ForumSectionElectric.findByPk(sectionId);
          break;
        case 'iot':
          sectionExists = await ForumSectionIoT.findByPk(sectionId);
          break;
        case 'school':
          sectionExists = await ForumSectionScholl.findByPk(sectionId);
          break;
        default:
          return next(ApiError.badRequest('Неверный тип раздела'));
      }

      if (!sectionExists) {
        return next(ApiError.notFound('Раздел не найден'));
      }

      const topics = await ForumTopic.findAll({
        where: { id_section: sectionId },
        include: [
          { model: User, attributes: ['id_user', 'username', 'avatar'] },
          { 
            model: ForumPost, 
            limit: 1,
            order: [['created_at', 'DESC']],
            include: [{ model: User, attributes: ['id_user', 'username'] }]
          }
        ],
        order: [['created_at', 'DESC']]
      });

      res.json(topics);
    } catch (e) {
      next(ApiError.internal('Ошибка при получении тем'));
    }
  }

  async create(req, res, next) {
    try {
      // Получаем id_user из авторизованного пользователя
      const { id_user } = req.user;
      const { title, description, id_section, section_type } = req.body;

      if (!title || !id_section || !section_type) {
        return next(ApiError.badRequest('Не указаны обязательные поля'));
      }

      // Проверка существования раздела
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
          return next(ApiError.badRequest('Неверный тип раздела'));
      }

      if (!section) {
        return next(ApiError.notFound('Раздел не найден'));
      }

      const newTopic = await ForumTopic.create({ 
        title, 
        description, 
        id_section, 
        id_user,
        id_forum: 1
      });

      // Создаем первое сообщение в теме
      await ForumPost.create({
        content: description,
        id_topic: newTopic.id_topic,
        id_user
      });

      res.status(201).json(newTopic);
    } catch (e) {
      next(ApiError.internal('Ошибка при создании темы'));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const topic = await ForumTopic.findOne({
        where: { id_topic: id },
        include: [
          { model: User, attributes: ['id_user', 'username', 'avatar'] },
          { model: ForumSectionElectric, as: 'electricSection', required: false },
          { model: ForumSectionIoT, as: 'iotSection', required: false },
          { model: ForumSectionScholl, as: 'schoolSection', required: false }
        ]
      });

      if (!topic) {
        return next(ApiError.notFound('Тема не найдена'));
      }

      // Определяем тип раздела
      let sectionType;
      if (topic.electricSection) sectionType = 'electric';
      else if (topic.iotSection) sectionType = 'iot';
      else if (topic.schoolSection) sectionType = 'school';

      res.json({ topic, sectionType });
    } catch (e) {
      next(ApiError.internal('Ошибка при получении темы'));
    }
  }
}

module.exports = new TopicController();