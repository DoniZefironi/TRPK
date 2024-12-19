const { Group } = require('../models/models'); // Убедитесь, что путь корректный
const ApiError = require('../error/ApiError');

class GroupController {
    // Создать группу
    async createGroup(req, res, next) {
        try {
            const { id_user, name_group, list_user } = req.body;

            // Проверка обязательных полей
            if (!name_group) {
                return next(ApiError.badRequest('Поле name_group обязательно'));
            }

            const newGroup = await Group.create({
                id_user,
                name_group,
                list_user,
            });

            res.status(201).json(newGroup);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания группы'));
        }
    }

    // Получить все группы
    async getGroups(req, res, next) {
        try {
            const groups = await Group.findAll();
            res.status(200).json(groups);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения групп'));
        }
    }

    // Получить группу по ID
    async getGroupById(req, res, next) {
        try {
            const { id } = req.params;

            const group = await Group.findByPk(id);

            if (!group) {
                return next(ApiError.notFound('Группа не найдена'));
            }

            res.status(200).json(group);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения группы'));
        }
    }

    // Обновить группу
    async updateGroup(req, res, next) {
        try {
            const { id } = req.params;
            const { id_user, name_group, list_user } = req.body;

            const group = await Group.findByPk(id);

            if (!group) {
                return next(ApiError.notFound('Группа не найдена'));
            }

            await group.update({
                id_user: id_user || group.id_user,
                name_group: name_group || group.name_group,
                list_user: list_user || group.list_user,
            });

            res.status(200).json(group);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления группы'));
        }
    }

    // Удалить группу
    async deleteGroup(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await Group.destroy({ where: { id_group: id } });

            if (!deleted) {
                return next(ApiError.notFound('Группа не найдена'));
            }

            res.status(200).json({ message: 'Группа успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления группы'));
        }
    }
}

module.exports = new GroupController();