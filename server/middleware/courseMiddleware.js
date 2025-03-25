const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const courseMiddleware = (requiredCourse) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.unauthorized('Нет токена'));
    }

    const token = authHeader.split(' ')[1];
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      if (userData.permissions !== requiredCourse) {
        return next(ApiError.forbidden('Доступ запрещен для этого курса'));
      }

      req.user = userData;
      next();
    } catch (error) {
      return next(ApiError.unauthorized('Неверный токен'));
    }
  };
};

module.exports = courseMiddleware;
