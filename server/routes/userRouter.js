const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const courseMiddleware = require('../middleware/courseMiddleware');
const multer = require('multer');

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Публичные маршруты
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh', userController.refresh);

// Защищенные маршруты
router.post('/logout', authMiddleware, userController.logout);
router.get('/:id', authMiddleware, userController.getUserInfo);
router.put('/:id', authMiddleware, upload.single('avatar'), userController.updateUser);

// Маршруты для курсов
router.get('/electronics-content', authMiddleware, courseMiddleware('electronics'), (req, res) => {
  res.json({ message: 'Доступ к материалам по электронике' });
});

router.get('/informatics-content', authMiddleware, courseMiddleware('informatics'), (req, res) => {
  res.json({ message: 'Доступ к материалам по информатике' });
});

router.get('/iot-content', authMiddleware, courseMiddleware('IoT'), (req, res) => {
  res.json({ message: 'Доступ к материалам по IoT' });
});

module.exports = router;