const { Forum } = require('../models/models');
const ApiError = require('../error/ApiError');

class ForumController {
    async createForum(req, res, next) {
        try {
            const { rules, section } = req.body;
            if (!section) return next(ApiError.badRequest('Поле section обязательно'));

            const newForum = await Forum.create({ rules, section });
            res.status(201).json(newForum);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания форума'));
        }
    }

    async getForums(req, res, next) {
        try {
            const forums = await Forum.findAll();
            res.status(200).json(forums);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения форумов'));
        }
    }
}

module.exports = new ForumController();
