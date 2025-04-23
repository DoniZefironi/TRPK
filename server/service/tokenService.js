const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../models/models');

class TokenService {
    generateTokens(payload) {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error("JWT секретные ключи не настроены");
        }
        
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '60m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            const tokenData = await RefreshToken.findOne({ where: { id_user: userId } });
            
            if (tokenData) {
                tokenData.refresh_token = refreshToken;
                return await tokenData.save();
            }
            
            return await RefreshToken.create({ 
                id_user: userId, 
                refresh_token: refreshToken 
            });
        } catch (e) {
            throw ApiError.internal("Ошибка сохранения токена");
        }
    }

    async removeToken(refreshToken) {
        try {
            return await RefreshToken.destroy({ 
                where: { refresh_token: refreshToken } 
            });
        } catch (e) {
            throw ApiError.internal("Ошибка удаления токена");
        }
    }

    async findToken(refreshToken) {
        try {
            return await RefreshToken.findOne({ 
                where: { refresh_token: refreshToken } 
            });
        } catch (e) {
            throw ApiError.internal("Ошибка поиска токена");
        }
    }
}

module.exports = new TokenService();