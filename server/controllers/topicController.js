const { ForumTopic, ForumPost, User, ForumSection } = require('../models/models');
const ApiError = require('../error/ApiError');

class TopicController {
  async getBySection(req, res, next) {
    try {
      const { sectionId } = req.params;
      
      if (!sectionId) {
        return next(ApiError.badRequest('Section ID is required'));
      }

      const topics = await ForumTopic.findAll({
        where: { sectionId },
        include: [
          { 
            model: User,
            attributes: ['id_user', 'username', 'avatar']
          },
          {
            model: ForumPost,
            attributes: ['id'],
            required: false
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      const topicsWithCount = topics.map(topic => ({
        ...topic.get({ plain: true }),
        postCount: topic.ForumPosts?.length || 0
      }));

      return res.json(topicsWithCount);
    } catch (e) {
      console.error('Error fetching topics:', e);
      return next(ApiError.internal('Error while fetching topics'));
    }
  }

  async create(req, res, next) {
    try {
      const { title, content, sectionId } = req.body;
      const userId = req.user.id_user; // From auth middleware
      
      if (!userId) {
        return next(ApiError.unauthorized('User not authenticated'));
      }

      const topic = await ForumTopic.create({
        title,
        content,
        sectionId,
        userId
      });
      
      // Fetch the newly created topic with user data
      const newTopic = await ForumTopic.findOne({
        where: { id: topic.id },
        include: [
          { model: User, attributes: ['id_user', 'username', 'avatar'] },
          { model: ForumSection, attributes: ['id', 'name'] }
        ]
      });
      
      return res.status(201).json(newTopic);
    } catch (e) {
      console.error('Error creating topic:', e);
      return next(ApiError.internal('Server error while creating topic'));
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      
      const topic = await ForumTopic.findOne({
        where: { id },
        include: [
          { model: User, attributes: ['id_user', 'username', 'avatar'] },
          { model: ForumSection, attributes: ['id', 'name'] }
        ]
      });
      
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }
      
      // Увеличиваем счетчик просмотров
      await topic.update({ views: topic.views + 1 });
      
      return res.json(topic);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new TopicController();