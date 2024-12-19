const { User } = require('../models/models'); // Подключение модели User
const ApiError = require('../error/ApiError'); // Подключение класса ApiError

class UserController {
  // Создать пользователя
  async createUser(req, res, next) {
      try {
          const { username, email, password, role, permissions } = req.body;

          // Проверка обязательных полей
          if (!username || !email || !password) {
              return next(ApiError.badRequest('Поля username, email и password обязательны'));
          }

          const newUser = await User.create({
              username,
              email,
              password,
              role,
              permissions,
          });

          res.status(201).json(newUser);
      } catch (error) {
          console.error(error);
          next(ApiError.internal('Ошибка создания пользователя'));
      }
  }

  // Получить всех пользователей
  async getUsers(req, res, next) {
      try {
          const users = await User.findAll();
          res.status(200).json(users);
      } catch (error) {
          console.error(error);
          next(ApiError.internal('Ошибка получения пользователей'));
      }
  }

  // Получить пользователя по ID
  async getUserById(req, res, next) {
      try {
          const { id } = req.params;
          const user = await User.findByPk(id);

          if (!user) {
              return next(ApiError.notFound('Пользователь не найден'));
          }

          res.status(200).json(user);
      } catch (error) {
          console.error(error);
          next(ApiError.internal('Ошибка получения пользователя'));
      }
  }

  // Обновить пользователя
  async updateUser(req, res, next) {
      try {
          const { id } = req.params;
          const { username, email, password, role, permissions } = req.body;

          const user = await User.findByPk(id);

          if (!user) {
              return next(ApiError.notFound('Пользователь не найден'));
          }

          // Обновляем поля
          await user.update({
              username: username || user.username,
              email: email || user.email,
              password: password || user.password,
              role: role || user.role,
              permissions: permissions || user.permissions,
          });

          res.status(200).json(user);
      } catch (error) {
          console.error(error);
          next(ApiError.internal('Ошибка обновления пользователя'));
      }
  }

  // Удалить пользователя
  async deleteUser(req, res, next) {
      try {
          const { id } = req.params;

          const deleted = await User.destroy({ where: { id_user: id } });

          if (!deleted) {
              return next(ApiError.notFound('Пользователь не найден'));
          }

          res.status(200).json({ message: 'Пользователь успешно удален' });
      } catch (error) {
          console.error(error);
          next(ApiError.internal('Ошибка удаления пользователя'));
      }
  }
}

module.exports = new UserController();