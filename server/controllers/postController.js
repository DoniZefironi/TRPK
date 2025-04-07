const { ForumPost, ForumTopic, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class PostController {
  async getByTopic(req, res, next) {
    try {
      const { topicId } = req.params;

      const topic = await ForumTopic.findByPk(topicId);
      if (!topic) {
        return next(ApiError.notFound('Тема не найдена'));
      }

      const posts = await ForumPost.findAll({
        where: { id_topic: topicId },
        include: [{ model: User, attributes: ['id_user', 'username', 'avatar'] }],
        order: [['created_at', 'ASC']]
      });

      res.json(posts);
    } catch (e) {
      next(ApiError.internal('Ошибка при получении сообщений'));
    }
  }

  async create(req, res, next) {
    try {
      const { id_topic } = req.params;
      const { content, id_user } = req.body;

      if (!content || !id_user) {
        return next(ApiError.badRequest('Не указаны обязательные поля'));
      }

      const topic = await ForumTopic.findByPk(id_topic);
      if (!topic) {
        return next(ApiError.notFound('Тема не найдена'));
      }

      const newPost = await ForumPost.create({
        content,
        id_topic,
        id_user
      });

      // Обновляем время последнего сообщения в теме
      await ForumTopic.update(
        { updated_at: new Date() },
        { where: { id_topic } }
      );

      res.status(201).json(newPost);
    } catch (e) {
      next(ApiError.internal('Ошибка при создании сообщения'));
    }
  }
}

module.exports = new PostController();