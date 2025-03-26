const { User } = require("../models/models");
const tokenService = require("./tokenService");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcryptjs");
const UserDto = require('../dtos/UserDto'); 
const path = require('path');
const fs = require('fs');

class UserService {
    async register(email, password, username, role) {
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw new Error(`Пользователь с такой почтой ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({
            email,
            password: hashPassword,
            username
        });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.badRequest("Пользователь не найден");
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.badRequest("Неверный пароль");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        console.log(refreshToken + "Заход в user-service");
        if (!refreshToken) {
            throw ApiError.unauthorized("Refresh token не найден");
        }
        const tokenFromDb = await tokenService.findToken(refreshToken);
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (!tokenFromDb || !userData) {
            throw ApiError.unauthorized("Refresh token не найден");
        }

        const user = await User.findOne({ where: { id: userData.id } });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async updateUser(userId, userData, avatarFile) {
        const user = await User.findByPk(userId);
      
        if (!user) {
          throw ApiError.notFound('Пользователь не найден');
        }
      
        console.log('Обновляем пользователя:', { userId, userData, avatarFile });
      
        // Если передан аватар, обрабатываем загрузку файла
        if (avatarFile) {
          const avatarName = `${userId}-${Date.now()}-${avatarFile.originalname}`;
          const avatarPath = path.resolve(__dirname, '..', 'uploads', avatarName);
          fs.writeFileSync(avatarPath, avatarFile.buffer);
          userData.avatar = `/uploads/${avatarName}`;
        }
      
        // Только переданные поля обновляются
        const updatableFields = ['username', 'email', 'phone', 'birthdate', 'location', 'bio', 'status', 'website', 'linkedin', 'telegram', 'permissions', 'avatar'];
        const updateData = {};
      
        // Перебираем только разрешённые для изменения поля
        for (const field of updatableFields) {
          if (userData[field] !== undefined) {
            updateData[field] = userData[field];
          }
        }
      
        await user.update(updateData);
      
        console.log('Данные после обновления:', user);
      
        return user; // Возвращаем обновленные данные пользователя
      }
            
      async findUserById(id) {
        return await User.findByPk(id);
    }
    
    // Поиск пользователя по email
    async findUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }
    
    // Хеширование пароля
    async hashPassword(password) {
        return await bcrypt.hash(password, 3);
    }
    
    // Сравнение паролей
    async comparePasswords(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    
    async updateUserProfile(id, updateData) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        
        await user.update(updateData);
        return user;
    }
    
}

module.exports = new UserService();