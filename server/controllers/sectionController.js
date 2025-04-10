const { ForumSection } = require('../models/models');
const ApiError = require('../error/ApiError');

class SectionController {
  async getAll(req, res) {
    try {
      const sections = await ForumSection.findAll();
      return res.json(sections);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  async create(req, res, next) {
    try {
      console.log('bububuuubb')
      const { name, type, description } = req.body;

      // Валидация типа раздела
      const allowedTypes = ['iot', 'electric', 'informatics'];
      if (!allowedTypes.includes(type)) {
        return next(ApiError.badRequest(`Недопустимый тип раздела. Допустимые значения: ${allowedTypes.join(', ')}`));
      }

      const section = await ForumSection.create({
        name,
        type,
        description: description || null
      });

      return res.status(201).json(section);
    } catch (e) {
      console.error('Ошибка при создании раздела:', e);
      return next(ApiError.internal('Ошибка сервера при создании раздела'));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const section = await ForumSection.findByPk(id);

      if (!section) {
        return next(ApiError.notFound('Раздел не найден'));
      }

      return res.json(section);
    } catch (e) {
      console.error('Ошибка при получении раздела:', e);
      return next(ApiError.internal('Ошибка сервера при получении раздела'));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const section = await ForumSection.findByPk(id);

      if (!section) {
        return next(ApiError.notFound('Раздел не найден'));
      }

      await section.destroy();
      return res.json({ message: 'Раздел успешно удален' });
    } catch (e) {
      console.error('Ошибка при удалении раздела:', e);
      return next(ApiError.internal('Ошибка сервера при удалении раздела'));
    }
  }
}

module.exports = new SectionController();