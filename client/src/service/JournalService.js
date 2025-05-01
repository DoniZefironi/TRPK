import axios from 'axios';

// Создаем экземпляр axios с базовыми настройками
const journalApi = axios.create({
  baseURL: 'http://localhost:2280/api/journal', // Базовый URL будет проксироваться через настройки vite/webpack
  withCredentials: true, // Для отправки кук аутентификации
  headers: {
    'Content-Type': 'application/json',
  },
});

// Обработчик ошибок
const handleError = (error) => {
  if (error.response) {
    // Сервер ответил с кодом состояния вне 2xx
    throw new Error(error.response.data.message || error.response.statusText);
  } else if (error.request) {
    // Запрос был сделан, но ответ не получен
    throw new Error('No response received from server');
  } else {
    // Произошла ошибка при настройке запроса
    throw new Error('Error setting up request');
  }
};

const JournalService = {
  /**
   * Получить все оценки с пагинацией и фильтрацией
   * @param {string} course - Название курса
   * @param {object} params - Параметры запроса (page, limit, userId, lectureId)
   * @returns {Promise<object>} - Ответ сервера с данными и пагинацией
   */
  getAllGrades: async (course, params = {}) => {
    try {
      const response = await journalApi.get(`/${course}`, { params });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Получить оценку по ID
   * @param {string} course - Название курса
   * @param {string|number} id - ID оценки
   * @returns {Promise<object>} - Данные оценки
   */
  getGradeById: async (course, id) => {
    try {
      const response = await journalApi.get(`/${course}/grade/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Получить оценки студента
   * @param {string} course - Название курса
   * @param {string|number} userId - ID пользователя
   * @returns {Promise<array>} - Массив оценок студента
   */
  getStudentGrades: async (course, userId) => {
    try {
      const response = await journalApi.get(`/${course}/student/${userId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Получить оценки по лекции
   * @param {string} course - Название курса
   * @param {string|number} lectureId - ID лекции
   * @returns {Promise<object>} - Данные лекции и массив оценок
   */
  getLectureGrades: async (course, lectureId) => {
    try {
      const response = await journalApi.get(`/${course}/lecture/${lectureId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Добавить оценку
   * @param {string} course - Название курса
   * @param {object} data - Данные для создания оценки
   * @returns {Promise<object>} - Созданная оценка
   */
  addGrade: async (course, data) => {
    try {
      const response = await journalApi.post(`/${course}`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Обновить оценку
   * @param {string} course - Название курса
   * @param {string|number} id - ID оценки
   * @param {object} data - Данные для обновления
   * @returns {Promise<object>} - Обновленная оценка
   */
  updateGrade: async (course, id, data) => {
    try {
      const response = await journalApi.put(`/${course}/${id}`, data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Удалить оценку
   * @param {string} course - Название курса
   * @param {string|number} id - ID оценки
   * @returns {Promise<void>}
   */
  deleteGrade: async (course, id) => {
    try {
      await journalApi.delete(`/${course}/${id}`);
    } catch (error) {
      handleError(error);
    }
  },

  // Дополнительные методы для управления API
  /**
   * Установка базового URL (может быть полезно для тестов)
   * @param {string} baseURL - Базовый URL API
   */
  setBaseURL: (baseURL) => {
    journalApi.defaults.baseURL = baseURL;
  },

  /**
   * Установка заголовка авторизации
   * @param {string} token - Токен авторизации
   */
  setAuthToken: (token) => {
    journalApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  /**
   * Удаление заголовка авторизации
   */
  removeAuthToken: () => {
    delete journalApi.defaults.headers.common['Authorization'];
  },
};

export default JournalService;