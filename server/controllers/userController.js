const bcrypt = require('bcryptjs');
const { User } = require('../models/models');
const tokenService = require('../service/tokenService');
const ApiError = require('../error/ApiError');
const UserDto = require('../dtos/UserDto');

class UserController {

  async register(req, res, next) {
    try {
      console.log('Регистрация пользователя:', req.body);
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
      console.error('Ошибка регистрации:', error);
      next(ApiError.internal('Ошибка регистрации'));
    }
  }

  async login(req, res, next) {
    try {
      console.log('Авторизация пользователя:', req.body);
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

      return res.status(200).json({ ...tokens, user: userDto });
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      next(ApiError.internal('Ошибка авторизации'));
    }
  }

  async refresh(req, res, next) {
    try {
      console.log('Обновление токена:', req.body);
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

      return res.status(200).json({ ...tokens, user: userDto });
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      next(ApiError.internal('Ошибка обновления токена'));
    }
  }

  async logout(req, res, next) {
    try {
      console.log('Выход пользователя:', req.body);
      const { refreshToken } = req.body;
      await tokenService.removeToken(refreshToken);
      res.status(200).json({ message: 'Вы успешно вышли из системы' });
    } catch (error) {
      console.error('Ошибка выхода:', error);
      next(ApiError.internal('Ошибка выхода из системы'));
    }
  }
}

module.exports = new UserController();
