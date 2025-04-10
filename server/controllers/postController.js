const { ForumPost, User } = require('../models/models');

class PostController {
  async getByTopic(req, res) {
    try {
      const { topicId } = req.params;
      
      const posts = await ForumPost.findAll({
        where: { topicId },
        include: [
          { model: User, attributes: ['id_user', 'username', 'avatar'] }
        ],
        order: [['createdAt', 'ASC']]
      });
      
      return res.json(posts);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  async create(req, res) {
    try {
      const { content, topicId, userId } = req.body;
      
      const post = await ForumPost.create({
        content,
        topicId,
        userId
      });
      
      // Получаем пост с информацией о пользователе
      const postWithUser = await ForumPost.findOne({
        where: { id: post.id },
        include: [
          { model: User, attributes: ['id_user', 'username', 'avatar'] }
        ]
      });
      
      return res.status(201).json(postWithUser);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new PostController();