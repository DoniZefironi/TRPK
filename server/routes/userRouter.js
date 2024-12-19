const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

// Маршруты для пользователей
router.post('/', userController.createUser); // Создать пользователя
router.get('/', userController.getUsers); // Получить всех пользователей
router.get('/:id', userController.getUserById); // Получить пользователя по ID
router.put('/:id', userController.updateUser); // Обновить пользователя
router.delete('/:id', userController.deleteUser); // Удалить пользователя

module.exports = router;