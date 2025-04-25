const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 🔹 Регистрация, вход, выход, обновление токена
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/refresh', userController.refresh);

router.get('/', userController.getAllUsers);
router.put('/:userId/role', userController.changeUserRole);

// 🔹 Получение и обновление пользователя по ID
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUserById);

module.exports = router;
