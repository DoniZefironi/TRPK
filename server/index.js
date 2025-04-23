require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const authMiddleware = require('./middleware/authMiddleware.js');
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js');
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 2280;

const app = express();

// Настройка CORS с явными заголовками
const corsOptions = {
  origin: 'http://localhost:3000', // Ваш фронтенд URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, 'static')));

// Обработка OPTIONS запросов
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

// Auth middleware только для API роутов
// app.use('/api', authMiddleware);
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('Error occurred during server startup:', error);
  }
};

start();