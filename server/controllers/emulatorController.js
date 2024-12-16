const { Emulator } = require('../models/models'); // Проверьте правильность пути к модели
const ApiError = require('../error/ApiError');

class EmulatorController {
    // Создать эмулятор
    async createEmulator(req, res, next) {
        try {
            const { device_type, functionality } = req.body;

            if (!device_type || !functionality) {
                return next(ApiError.badRequest('Поля device_type и functionality обязательны'));
            }

            const newEmulator = await Emulator.create({
                device_type,
                functionality,
            });

            res.status(201).json(newEmulator);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания эмулятора'));
        }
    }

    // Получить все эмуляторы
    async getEmulators(req, res, next) {
        try {
            const emulators = await Emulator.findAll();
            res.status(200).json(emulators);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения эмуляторов'));
        }
    }

    // Получить эмулятор по ID
    async getEmulatorById(req, res, next) {
        try {
            const { id } = req.params;

            const emulator = await Emulator.findByPk(id);

            if (!emulator) {
                return next(ApiError.notFound('Эмулятор не найден'));
            }

            res.status(200).json(emulator);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения эмулятора'));
        }
    }

    // Обновить эмулятор
    async updateEmulator(req, res, next) {
        try {
            const { id } = req.params;
            const { device_type, functionality } = req.body;

            const emulator = await Emulator.findByPk(id);

            if (!emulator) {
                return next(ApiError.notFound('Эмулятор не найден'));
            }

            await emulator.update({
                device_type: device_type || emulator.device_type,
                functionality: functionality || emulator.functionality,
            });

            res.status(200).json(emulator);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления эмулятора'));
        }
    }

    // Удалить эмулятор
    async deleteEmulator(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await Emulator.destroy({ where: { id_emulator: id } });

            if (!deleted) {
                return next(ApiError.notFound('Эмулятор не найден'));
            }

            res.status(200).json({ message: 'Эмулятор успешно удалён' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления эмулятора'));
        }
    }
}

module.exports = new EmulatorController();