const bcrypt = require('bcryptjs');
const { User, RefreshToken } = require('../models/models');
const tokenService = require('../service/tokenService');
const UserService = require('../service/userService');
const ApiError = require('../error/ApiError');
const UserDto = require('../dtos/userDto');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

class UserController {
  async register(req, res, next) {
    try {
      const { username, email, password, permissions } = req.body;
      
      if (!username || !email || !password || !permissions) {
        return next(ApiError.badRequest('Все поля обязательны для заполнения'));
      }

      const userData = await UserService.register(email, password, username, permissions);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return res.status(201).json({
        ...userData,
        message: 'Регистрация прошла успешно'
      });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getAllUsers(req, res, next) {
    try {
        console.log('Запрос на получение всех пользователей');

        const users = await User.findAll({
            attributes: { exclude: ['password', 'refreshToken'] }
        });

        return res.json(users);
    } catch (error) {
        console.error('Ошибка получения пользователей:', error);
        next(ApiError.internal('Ошибка при получении списка пользователей'));
    }
}

async changeUserRole(req, res, next) {
  try {
      const { userId } = req.params;
      const { role } = req.body;

      const validRoles = ['USER', 'TEACHER', 'ADMIN'];

      if (!validRoles.includes(role)) {
          return next(ApiError.badRequest('Недопустимая роль. Возможные варианты: USER, TEACHER, ADMIN'));
      }

      const user = await User.findByPk(userId);
      if (!user) {
          return next(ApiError.notFound('Пользователь не найден'));
      }

      await user.update({ permissions: role });

      return res.json({
          success: true,
          data: user,
          message: `Роль пользователя успешно изменена на ${role}`
      });
  } catch (error) {
      console.error('Ошибка изменения роли пользователя:', error);
      next(ApiError.internal('Ошибка при изменении роли'));
  }
}


  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return next(ApiError.badRequest('Email и пароль обязательны'));
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }

      const isPassValid = await bcrypt.compare(password, user.password);
      if (!isPassValid) {
        return next(ApiError.badRequest('Неверный пароль'));
      }

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return res.json({
        user: userDto,
        accessToken: tokens.accessToken
      });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.unauthorized('Токен не найден'));
      }
      
      await tokenService.removeToken(refreshToken);
      res.clearCookie('refreshToken');
      
      return res.json({ message: 'Выход выполнен успешно' });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.unauthorized('Токен отсутствует'));
      }

      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
        return next(ApiError.unauthorized('Недействительный токен'));
      }

      const user = await User.findByPk(userData.id);
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return res.json({
        ...tokens,
        user: userDto,
        message: 'Токен успешно обновлен'
      });
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      next(ApiError.internal('Ошибка при обновлении токена'));
    }
  }

  // 🔹 Получение пользователя по ID
  async getUserById(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      console.log(`Запрос на получение пользователя с ID: ${userId}`);

      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password', 'refreshToken'] }
      });

      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      return res.json(user);
    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      next(ApiError.internal('Ошибка при получении пользователя'));
    }
  }

  // 🔹 Обновление пользователя по ID
  async updateUserById(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      console.log(`Запрос на обновление пользователя с ID: ${userId}`);

      const user = await User.findByPk(userId);
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      await user.update(req.body);

      return res.json({
        success: true,
        data: user,
        message: 'Пользователь обновлен'
      });
    } catch (error) {
      console.error('Ошибка обновления пользователя:', error);
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new UserController();
