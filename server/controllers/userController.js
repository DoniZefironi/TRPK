const { User } = require('../models/models'); // Подключение модели User
const ApiError = require('../error/ApiError'); // Подключение класса ApiError

// Контроллер для управления пользователями
const userController = {
  // Получить всех пользователей
  async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(ApiError.internal('Ошибка получения пользователей'));
    }
  },

  // Получить пользователя по ID
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }
      res.status(200).json(user);
    } catch (error) {
      next(ApiError.internal('Ошибка получения данных пользователя'));
    }
  },

  // Создать нового пользователя
  async createUser(req, res, next) {
    try {
      const { username, email, password, role, permissions } = req.body;

      // Проверяем обязательные поля
      if (!username || !email || !password) {
        return next(ApiError.badRequest('Необходимо указать имя пользователя, email и пароль'));
      }

      // Создаем нового пользователя
      const newUser = await User.create({
        username,
        email,
        password,
        role,
        permissions,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(ApiError.internal('Ошибка создания пользователя'));
    }
  },

  // Обновить пользователя по ID
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, email, password, role, permissions } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }

      // Обновляем данные пользователя
      user.username = username || user.username;
      user.email = email || user.email;
      user.password = password || user.password;
      user.role = role || user.role;
      user.permissions = permissions || user.permissions;

      await user.save();
      res.status(200).json(user);
    } catch (error) {
      next(ApiError.internal('Ошибка обновления данных пользователя'));
    }
  },

  // Удалить пользователя по ID
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }

      await user.destroy();
      res.status(200).json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      next(ApiError.internal('Ошибка удаления пользователя'));
    }
  },
};

module.exports = userController;
