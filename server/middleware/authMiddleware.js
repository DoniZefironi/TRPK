const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(ApiError.unauthorized('Токен не предоставлен'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = userData; // Данные о пользователе из токена
    next();
  } catch (error) {
    return next(ApiError.unauthorized('Неверный токен'));
  }
};
