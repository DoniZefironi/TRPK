const bcrypt = require('bcryptjs');
const { User } = require('../models/models');
const tokenService = require('../service/tokenService');
const ApiError = require('../error/ApiError');
const UserDto = require('../dtos/UserDto');
const path = require('path');
const fs = require('fs');

class UserController {
  // Регистрация
  async register(req, res, next) {
    try {
      const { username, email, password, permissions } = req.body;
      const allowedCourses = ['electronics', 'informatics', 'IoT'];

      if (!allowedCourses.includes(permissions)) {
        return next(ApiError.badRequest(`Курс '${permissions}' недопустим`));
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const user = await User.create({ username, email, password: hashPassword, permissions });

      const userDto = new UserDto(user);
      const tokens = tokenService.generateToken({ ...userDto });
      await tokenService.saveToken(userDto.id_user, tokens.refreshToken);

      res.status(201).json({ ...tokens, user: userDto });
    } catch (error) {
      next(ApiError.internal('Ошибка регистрации'));
    }
  }

  // Вход
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }

      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        return next(ApiError.badRequest('Неверный пароль'));
      }

      const userDto = new UserDto(user);
      const tokens = tokenService.generateToken({ ...userDto });
      await tokenService.saveToken(userDto.id_user, tokens.refreshToken);

      res.status(200).json({ ...tokens, user: userDto });
    } catch (error) {
      next(ApiError.internal('Ошибка авторизации'));
    }
  }

  // Обновление токена
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return next(ApiError.unauthorized('Токен отсутствует'));
      }

      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
        return next(ApiError.unauthorized('Токен недействителен'));
      }

      const user = await User.findByPk(userData.id);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateToken({ ...userDto });
      await tokenService.saveToken(userDto.id_user, tokens.refreshToken);

      res.status(200).json({ ...tokens, user: userDto });
    } catch (error) {
      next(ApiError.internal('Ошибка обновления токена'));
    }
  }

  // Выход
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      await tokenService.removeToken(refreshToken);
      res.status(200).json({ message: 'Вы успешно вышли' });
    } catch (error) {
      next(ApiError.internal('Ошибка выхода'));
    }
  }

  // Получение информации о пользователе
  async getUserInfo(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      });
      
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }
      
      res.status(200).json(user);
    } catch (error) {
      next(ApiError.internal('Ошибка получения информации'));
    }
  }

  // Обновление пользователя
  async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
      
      // Проверка прав доступа
      if (req.user.id_user !== parseInt(userId)) {
        return next(ApiError.forbidden('Нет прав на обновление этого профиля'));
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      // Обновляем только разрешенные поля
      const allowedFields = ['username', 'email', 'phone', 'birthdate', 'location', 
                          'bio', 'status', 'website', 'linkedin', 'telegram', 'permissions'];
      
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      });

      // Обработка аватара
      if (req.file) {
        // Удаляем старый аватар, если он существует
        if (user.avatar) {
          const oldAvatarPath = path.join(__dirname, '..', 'static', user.avatar);
          if (fs.existsSync(oldAvatarPath)) {
            fs.unlinkSync(oldAvatarPath);
          }
        }
        user.avatar = req.file.filename;
      }

      await user.save();
      
      const { password, ...responseData } = user.get({ plain: true });
      res.status(200).json(responseData);
    } catch (error) {
      console.error('Update error:', error);
      next(ApiError.internal(error.message || 'Ошибка обновления профиля'));
    }
  }
}

module.exports = new UserController();