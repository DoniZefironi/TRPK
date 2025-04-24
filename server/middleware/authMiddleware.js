const tokenService = require('../service/tokenService');
const ApiError = require('../error/ApiError');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.unauthorized('Токен отсутствует'));
        }

        const token = authHeader.split(' ')[1];
        const userData = tokenService.validateAccessToken(token);

        if (!userData) {
            return next(ApiError.unauthorized('Токен недействителен'));
        }

        req.user = userData; // Добавляем user в `req`
        next();
    } catch (error) {
        next(ApiError.internal('Ошибка проверки токена'));
    }
};
