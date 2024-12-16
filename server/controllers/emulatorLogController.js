const { EmulatorLog } = require('../models/models'); // Проверьте правильность пути к модели
const ApiError = require('../error/ApiError');

class EmulatorLogController {
    // Создать лог эмулятора
    async createEmulatorLog(req, res, next) {
        try {
            const { id_emulator, timestamp, action, status } = req.body;

            if (!id_emulator || !action || !status) {
                return next(ApiError.badRequest('Поля id_emulator, action и status обязательны'));
            }

            const newLog = await EmulatorLog.create({
                id_emulator,
                timestamp: timestamp || new Date(),
                action,
                status,
            });

            res.status(201).json(newLog);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания лога эмулятора'));
        }
    }

    // Получить все логи эмулятора
    async getEmulatorLogs(req, res, next) {
        try {
            const logs = await EmulatorLog.findAll();
            res.status(200).json(logs);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения логов эмулятора'));
        }
    }

    // Получить лог эмулятора по ID
    async getEmulatorLogById(req, res, next) {
        try {
            const { id } = req.params;
            const log = await EmulatorLog.findByPk(id);

            if (!log) {
                return next(ApiError.notFound('Лог эмулятора не найден'));
            }

            res.status(200).json(log);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения лога эмулятора'));
        }
    }

    // Обновить лог эмулятора
    async updateEmulatorLog(req, res, next) {
        try {
            const { id } = req.params;
            const { id_emulator, timestamp, action, status } = req.body;

            const log = await EmulatorLog.findByPk(id);

            if (!log) {
                return next(ApiError.notFound('Лог эмулятора не найден'));
            }

            await log.update({
                id_emulator: id_emulator || log.id_emulator,
                timestamp: timestamp || log.timestamp,
                action: action || log.action,
                status: status || log.status,
            });

            res.status(200).json(log);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления лога эмулятора'));
        }
    }

    // Удалить лог эмулятора
    async deleteEmulatorLog(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await EmulatorLog.destroy({ where: { id_log: id } });

            if (!deleted) {
                return next(ApiError.notFound('Лог эмулятора не найден'));
            }

            res.status(200).json({ message: 'Лог успешно удалён' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления лога эмулятора'));
        }
    }
}

module.exports = new EmulatorLogController();