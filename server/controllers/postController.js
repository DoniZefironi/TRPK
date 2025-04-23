const { ForumPost, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class PostController {
  async getByTopic(req, res, next) {
    try {
      const { topicId } = req.params;
      let { page = 1, limit = 20 } = req.query;
      
      // Валидация параметров
      if (isNaN(page) || isNaN(limit)) {
        return next(ApiError.badRequest('Некорректные параметры пагинации'));
      }
      
      page = parseInt(page);
      limit = parseInt(limit);
      const offset = (page - 1) * limit;

      const { count, rows: posts } = await ForumPost.findAndCountAll({
        where: { topicId },
        include: [
          { 
            model: User, 
            attributes: ['id_user', 'username', 'avatar'],
            as: 'user' // Убедитесь, что указано правильное имя ассоциации
          }
        ],
        order: [['createdAt', 'ASC']],
        limit,
        offset
      });
      
      return res.json({
        posts,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit)
        }
      });
    } catch (e) {
      console.error('Error in getByTopic:', e);
      next(ApiError.internal('Ошибка при получении сообщений'));
    }
  }

  async create(req, res, next) {
    try {
      const { content, topicId, userId } = req.body;
      
      // Валидация входных данных
      if (!content || !topicId || !userId) {
        return next(ApiError.badRequest('Не все обязательные поля заполнены'));
      }
      
      // Проверка существования пользователя
      const user = await User.findByPk(userId);
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      const post = await ForumPost.create({
        content,
        topicId,
        userId
      });
      
      // Автоматически включаем информацию о пользователе
      const postWithUser = await ForumPost.findByPk(post.id, {
        include: [
          { 
            model: User, 
            attributes: ['id_user', 'username', 'avatar'],
            as: 'user'
          }
        ]
      });
      
      return res.status(201).json(postWithUser);
    } catch (e) {
      console.error('Error in create post:', e);
      next(ApiError.internal('Ошибка при создании сообщения'));
    }
  }

  // Дополнительный метод для обновления поста
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { content, userId } = req.body;
      
      const post = await ForumPost.findByPk(id);
      if (!post) {
        return next(ApiError.notFound('Сообщение не найдено'));
      }
      
      // Проверка прав на редактирование
      if (post.userId !== userId) {
        return next(ApiError.forbidden('Нет прав на редактирование этого сообщения'));
      }
      
      await post.update({ content });
      return res.json(post);
    } catch (e) {
      console.error('Error in update post:', e);
      next(ApiError.internal('Ошибка при обновлении сообщения'));
    }
  }
}

module.exports = new PostController();