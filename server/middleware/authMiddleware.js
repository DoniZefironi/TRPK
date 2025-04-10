// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = function(req, res, next) {
  // Skip middleware for login and refresh endpoints
  if (req.path === '/user/login' || req.path === '/user/refresh') {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return next(ApiError.unauthorized('Authorization header is required'));
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return next(ApiError.unauthorized('Invalid token format'));
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return next(ApiError.unauthorized('Token expired'));
    }
    return next(ApiError.unauthorized('Invalid token'));
  }
};