const { ForumPost } = require('../models/models');
const ApiError = require('../error/ApiError');

class PostController {
  async createPost(req, res, next) {
    try {
      const { content, id_topic, id_user } = req.body;

      if (!content || !id_topic) {
        return next(ApiError.badRequest('Поле content и id_topic обязательны'));
      }

      const newPost = await ForumPost.create({ content, id_topic, id_user });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      next(ApiError.internal('Ошибка создания сообщения'));
    }
  }

  async getPosts(req, res, next) {
    try {
      const { id_topic } = req.params;

      const posts = await ForumPost.findAll({ where: { id_topic } });
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      next(ApiError.internal('Ошибка получения сообщений'));
    }
  }
}
module.exports = new PostController();
