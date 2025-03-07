const ApiError = require('../error/ApiError');
const tokenService = require('../service/tokenService');

module.exports = function (req, res, next) {
    try {
        const authorization = req.headers.authorization;

        // Проверка наличия заголовка Authorization
        if (!authorization) {
            return next(ApiError.unauthorized("Пользователь не авторизован"));
        }

        // Извлечение токена из заголовка
        const accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorized("Пользователь не авторизован"));
        }

        // Валидация токена
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorized("Пользователь не авторизован"));
        }

        // Добавление данных пользователя в объект запроса
        req.user = userData;
        next();
    } catch (err) {
        console.error("Ошибка аутентификации:", err);
        return next(ApiError.unauthorized("Пользователь не авторизован"));
    }
};