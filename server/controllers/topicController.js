const { ForumTopic, ForumPost, User, ForumSection } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class TopicController {
    // Получение тем раздела с пагинацией
    async getBySection(req, res, next) {
        try {
            const { sectionId } = req.params;
            let { page = 1, limit = 15, search } = req.query;
            
            if (!sectionId) {
                return next(ApiError.badRequest('Не указан ID раздела'));
            }

            // Проверка существования раздела
            const section = await ForumSection.findByPk(sectionId);
            if (!section) {
                return next(ApiError.notFound('Раздел не найден'));
            }

            // Подготовка условий поиска
            const where = { sectionId };
            if (search) {
                where[Op.or] = [
                    { title: { [Op.iLike]: `%${search}%` } },
                    { content: { [Op.iLike]: `%${search}%` } }
                ];
            }

const { count, rows: topics } = await ForumTopic.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: (page - 1) * limit,
    order: [['createdAt', 'DESC']],
include: [
  { 
    model: User,
    as: 'author', // Должно соответствовать алиасу в ассоциациях
    attributes: ['id_user', 'username', 'avatar']
  },
  {
    model: ForumPost,
    as: 'ForumPosts', // ✅ Правильно
    attributes: ['id'],
    required: false
  }
],
    distinct: true
});




            const topicsWithCount = topics.map(topic => ({
                ...topic.get({ plain: true }),
                postCount: topic.posts?.length || 0
            }));

            return res.json({
                success: true,
                data: topicsWithCount,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (e) {
            console.error('Ошибка при получении тем:', e);
            next(ApiError.internal('Ошибка сервера при получении тем'));
        }
    }

    // Создание новой темы
    async create(req, res, next) {
  try {
    const { title, content, sectionId, userId } = req.body;

    if (!title || !content || !sectionId || !userId) {
      return next(ApiError.badRequest('Не указаны обязательные поля'));
    }

    const topic = await ForumTopic.create({
      title,
      content,
      sectionId,
      userId,
      views: 0
    });

    // Получаем созданную тему с минимальными данными (без лишних include)
    const newTopic = await ForumTopic.findByPk(topic.id, {
      include: [
        { 
          model: User,
          as: 'author', // Используем правильный алиас
          attributes: ['id_user', 'username', 'avatar']
        },
        { 
          model: ForumSection,
          as: 'section',
          attributes: ['id', 'name']
        }
      ]
    });

    return res.status(201).json({
      success: true,
      data: newTopic,
      message: 'Тема успешно создана'
    });
  } catch (e) {
    console.error('Ошибка при создании темы:', e);
    next(ApiError.internal('Ошибка сервера при создании темы'));
  }
}

    // Получение конкретной темы
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            
            const topic = await ForumTopic.findOne({
                where: { id },
                include: [
                    { 
                        model: User,
                        as: 'user',
                        attributes: ['id_user', 'username', 'avatar']
                    },
                    { 
                        model: ForumSection,
                        as: 'section',
                        attributes: ['id', 'name', 'type']
                    }
                ]
            });
            
            if (!topic) {
                return next(ApiError.notFound('Тема не найдена'));
            }
            
            // Увеличиваем счетчик просмотров
            await topic.increment('views');
            
            return res.json({
                success: true,
                data: topic
            });
        } catch (e) {
            console.error('Ошибка при получении темы:', e);
            next(ApiError.internal('Ошибка сервера при получении темы'));
        }
    }

    // Обновление темы
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const userId = req.user.id_user;

            const topic = await ForumTopic.findByPk(id);
            if (!topic) {
                return next(ApiError.notFound('Тема не найдена'));
            }

            // Проверка прав на редактирование
            if (topic.userId !== userId) {
                return next(ApiError.forbidden('Нет прав на редактирование этой темы'));
            }

            await topic.update({ 
                title: title || topic.title,
                content: content || topic.content
            });

            return res.json({
                success: true,
                data: topic,
                message: 'Тема успешно обновлена'
            });
        } catch (e) {
            console.error('Ошибка при обновлении темы:', e);
            next(ApiError.internal('Ошибка сервера при обновлении темы'));
        }
    }

    // Удаление темы
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id_user;

            const topic = await ForumTopic.findByPk(id);
            if (!topic) {
                return next(ApiError.notFound('Тема не найдена'));
            }

            // Проверка прав на удаление
            if (topic.userId !== userId) {
                return next(ApiError.forbidden('Нет прав на удаление этой темы'));
            }

            await topic.destroy();
            return res.json({
                success: true,
                message: 'Тема успешно удалена'
            });
        } catch (e) {
            console.error('Ошибка при удалении темы:', e);
            next(ApiError.internal('Ошибка сервера при удалении темы'));
        }
    }
}

module.exports = new TopicController();