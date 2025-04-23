const bcrypt = require('bcryptjs');
const { User, RefreshToken } = require('../models/models');
const tokenService = require('../service/tokenService');
const ApiError = require('../error/ApiError');
const UserDto = require('../dtos/userDto');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

class UserController {
  async register(req, res, next) {
    try {
      const { username, email, password, permissions } = req.body;
      
      // Валидация входных данных
      if (!username || !email || !password || !permissions) {
        return next(ApiError.badRequest('Все поля обязательны для заполнения'));
      }

      // Проверка уникальности email и username
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email },
            { username }
          ]
        }
      });

      if (existingUser) {
        const conflictField = existingUser.email === email ? 'email' : 'username';
        return next(ApiError.badRequest(`Пользователь с таким ${conflictField} уже существует`));
      }

      // Создание пользователя (хэширование пароля в хуках модели)
      const user = await User.create({ 
        username, 
        email, 
        password, 
        permissions 
      });

      // Генерация токенов
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      // Установка cookies
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return res.status(201).json({
        ...tokens,
        user: userDto,
        message: 'Регистрация прошла успешно'
      });
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      next(ApiError.internal('Ошибка при регистрации пользователя'));
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
        return next(ApiError.unauthorized('Неверные учетные данные'));
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(ApiError.unauthorized('Неверные учетные данные'));
      }

      // Обновляем последний вход
      await user.update({ last_login: new Date() });

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      // Установка cookies
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return res.json({
        ...tokens,
        user: userDto,
        message: 'Авторизация прошла успешно'
      });
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      next(ApiError.internal('Ошибка при авторизации'));
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.unauthorized('Токен отсутствует'));
      }

      await tokenService.removeToken(refreshToken);
      res.clearCookie('refreshToken');

      return res.json({ message: 'Вы успешно вышли из системы' });
    } catch (error) {
      console.error('Ошибка выхода:', error);
      next(ApiError.internal('Ошибка при выходе из системы'));
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

      // Обновляем cookie
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

  async getProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      return res.json(user);
    } catch (error) {
      console.error('Ошибка получения профиля:', error);
      next(ApiError.internal('Ошибка при получении профиля'));
    }
  }

  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      const allowedFields = [
        'username', 'email', 'phone', 'birthdate',
        'location', 'bio', 'website', 'linkedin', 'telegram'
      ];

      const updateData = {};
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      }

      // Обработка аватара
      if (req.file) {
        if (user.avatar) {
          const oldAvatarPath = path.join(__dirname, '..', 'uploads', user.avatar);
          if (fs.existsSync(oldAvatarPath)) {
            fs.unlinkSync(oldAvatarPath);
          }
        }
        updateData.avatar = `/uploads/${req.file.filename}`;
      }

      await user.update(updateData);

      const userDto = new UserDto(user);
      return res.json({
        user: userDto,
        message: 'Профиль успешно обновлен'
      });
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      next(ApiError.internal('Ошибка при обновлении профиля'));
    }
  }
}

module.exports = new UserController();