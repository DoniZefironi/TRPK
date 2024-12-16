const { EmulatorConfiguration } = require('../models/models'); // Проверьте правильность пути к модели
const ApiError = require('../error/ApiError');

class EmulatorConfController {
    // Создать конфигурацию эмулятора
    async createEmulatorConfig(req, res, next) {
        try {
            const { id_emulator, config_name, settings } = req.body;

            if (!id_emulator || !config_name || !settings) {
                return next(ApiError.badRequest('Поля id_emulator, config_name и settings обязательны'));
            }

            const newConfig = await EmulatorConfiguration.create({
                id_emulator,
                config_name,
                settings,
            });

            res.status(201).json(newConfig);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка создания конфигурации эмулятора'));
        }
    }

    // Получить все конфигурации эмулятора
    async getEmulatorConfigs(req, res, next) {
        try {
            const configs = await EmulatorConfiguration.findAll();
            res.status(200).json(configs);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения конфигураций эмулятора'));
        }
    }

    // Получить конфигурацию эмулятора по ID
    async getEmulatorConfigById(req, res, next) {
        try {
            const { id } = req.params;
            const config = await EmulatorConfiguration.findByPk(id);

            if (!config) {
                return next(ApiError.notFound('Конфигурация эмулятора не найдена'));
            }

            res.status(200).json(config);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка получения конфигурации эмулятора'));
        }
    }

    // Обновить конфигурацию эмулятора
    async updateEmulatorConfig(req, res, next) {
        try {
            const { id } = req.params;
            const { id_emulator, config_name, settings } = req.body;

            const config = await EmulatorConfiguration.findByPk(id);

            if (!config) {
                return next(ApiError.notFound('Конфигурация эмулятора не найдена'));
            }

            await config.update({
                id_emulator: id_emulator || config.id_emulator,
                config_name: config_name || config.config_name,
                settings: settings || config.settings,
            });

            res.status(200).json(config);
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка обновления конфигурации эмулятора'));
        }
    }

    // Удалить конфигурацию эмулятора
    async deleteEmulatorConfig(req, res, next) {
        try {
            const { id } = req.params;

            const deleted = await EmulatorConfiguration.destroy({ where: { id_config: id } });

            if (!deleted) {
                return next(ApiError.notFound('Конфигурация эмулятора не найдена'));
            }

            res.status(200).json({ message: 'Конфигурация успешно удалена' });
        } catch (error) {
            console.error(error);
            next(ApiError.internal('Ошибка удаления конфигурации эмулятора'));
        }
    }
}

module.exports = new EmulatorConfController();