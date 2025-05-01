const { User } = require("../models/models");
const tokenService = require("./tokenService");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcryptjs");
const UserDto = require('../dtos/userDto'); 

class UserService {
    async register(email, password, username, permissions) {
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
          throw ApiError.badRequest(`Пользователь с почтой ${email} уже существует`);
        }
        
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({
          email,
          password: hashPassword,
          username,
          permissions, // Теперь передаем permissions
          role: 'USER'  // Роль по умолчанию
        });
      
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {
          user: userDto,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken
        };
      }

    async login(email, password) {
        console.log('Login attempt for email:', email); // Debug log
    
        const user = await User.findOne({ where: { email } });
        if (!user) throw ApiError.badRequest("User not found");
        
        console.log('Stored password hash:', user.password); // Debug log
        console.log('Input password:', password); // Debug log
        
        const isPassEqual = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isPassEqual); // Debug log
        
        if (!isPassEqual) throw ApiError.badRequest("Invalid password");
        
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {
            user: userDto,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        };
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.badRequest("Refresh token не предоставлен");
        }
        const tokenData = await tokenService.removeToken(refreshToken);
        return tokenData;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized("Refresh token не найден");
        }
        
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorized("Невалидный refresh token");
        }

        const user = await User.findOne({ where: { id: userData.id } });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {
            user: userDto,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        };
    }
}

module.exports = new UserService();