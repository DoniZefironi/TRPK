const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../models/models');

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '60m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    try {
        console.log('Сохранение токена для пользователя:', userId, 'Токен:', refreshToken);

        const tokenData = await RefreshToken.findOne({ where: { id_user: userId } });
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            await tokenData.save();
            console.log('Токен обновлен успешно');
        } else {
            await RefreshToken.create({ id_user: userId, refresh_token: refreshToken });
            console.log('Токен создан успешно');
        }
    } catch (error) {
        console.error('Ошибка сохранения токена:', error);
        throw new Error('Ошибка сохранения токена');
    }
}


async removeToken(refreshToken) {
  try {
    if (!refreshToken) {
      throw new Error('Токен не предоставлен'); // Убедимся, что передается токен
    }

    const result = await RefreshToken.destroy({
      where: { refresh_token: refreshToken },
    });

    return result;
  } catch (error) {
    console.error('Ошибка при удалении токена:', error);
    throw error;
  }
}


  async findToken(refreshToken) {
    return await RefreshToken.findOne({ where: { refresh_token: refreshToken } });
  }
}

module.exports = new TokenService();