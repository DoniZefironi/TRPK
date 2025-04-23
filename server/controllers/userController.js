const bcrypt = require('bcryptjs');
const { User, RefreshToken } = require('../models/models');
const tokenService = require('../service/tokenService');
const UserService = require('../service/userService')
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
  
      // 🔥 Используем UserService.register вместо прямого User.create()
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

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      // Input validation
      if (!email || !password) {
        return next(ApiError.badRequest('Email and password are required'));
      }
  
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.badRequest('User not found'));
      }
  
      const isPassValid = await bcrypt.compare(password, user.password);
      if (!isPassValid) {
        return next(ApiError.badRequest('Invalid password'));
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

// logout
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

  async getUserProfile(req, res, next) {
    try {
      console.log('Получение профиля для userId:', req.params.userId);
      const user = await User.findByPk(req.params.userId, {
        attributes: { 
          exclude: ['password', 'refreshToken'],
        },
        raw: true // Добавьте это для получения простого объекта
      });
  
      if (!user) {
        console.log('Пользователь не найден в БД');
        return next(ApiError.notFound('Пользователь не найден'));
      }
  
      console.log('Найден пользователь:', user);
      return res.json({
        ...user,
        // Добавляем дополнительные поля, если нужно
        permissions: user.permissions || 'electronics' // Значение по умолчанию
      });
    } catch (error) {
      console.error('Ошибка в getUserProfile:', error);
      next(ApiError.internal('Ошибка при получении профиля пользователя'));
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