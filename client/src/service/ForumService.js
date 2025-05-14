import axios from 'axios';

const API_URL = 'http://localhost:2280/api/forum';

class ForumService {
  // 🔹 Получение всех разделов
  async getAllSections() {
    try {
      const response = await axios.get(`${API_URL}/sections`);
      console.log('Полученные разделы:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении разделов:', error.response?.data || error.message);
      throw error;
    }
  }

  // 🔹 Создание раздела
  async createSection(sectionData) {
    try {
      const response = await axios.post(`${API_URL}/sections`, sectionData);
      console.log('Созданный раздел:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании раздела:', error.response?.data || error.message);
      throw error;
    }
  }

  // 🔹 Получение одного раздела по ID
  async getSectionById(sectionId) {
    try {
      const response = await axios.get(`${API_URL}/sections/${sectionId}`);
      console.log('Полученный раздел:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении раздела:', error.response?.data || error.message);
      throw error;
    }
  }

  // 🔹 Получение всех тем раздела
async getTopicsBySection(sectionId) {
  try {
    const response = await axios.get(`${API_URL}/sections/${sectionId}/topics`);
    console.log('Полученные темы (raw):', response.data);
    
    // Проверяем структуру ответа
    if (!response.data || !response.data.data) {
      console.error('Неверная структура ответа:', response.data);
      throw new Error('Некорректный формат данных от сервера');
    }
    
    return {
      ...response.data,
      data: response.data.data.map(topic => ({
        ...topic,
        title: topic.title || 'Без названия' // Fallback
      }))
    };
  } catch (error) {
    console.error('Ошибка при получении тем:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    throw error;
  }
}

  // 🔹 Получение одной темы по ID
  async getTopicById(sectionId, topicId) {
    try {
      const response = await axios.get(`${API_URL}/sections/${sectionId}/topics/${topicId}`);
      if (!response.data) throw new Error('Ошибка: сервер не вернул данные');

      console.log('Полученная тема:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении темы:', error.response?.data || error.message);
      throw error;
    }
  }

  // 🔹 Создание темы в разделе
  async createTopic(sectionId, topicData) {
    try {
      if (!topicData.title || !topicData.content) {
        throw new Error('Отсутствуют обязательные поля: title или content');
      }

const response = await axios.post(`${API_URL}/sections/${sectionId}/topics`, topicData);

      console.log('Созданная тема:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании темы:', error.response?.data || error.message);
      throw error;
    }
  }

  // 🔹 Обновление темы
  async updateTopic(sectionId, topicId, topicData) {
    try {
const response = await axios.put(`${API_URL}/sections/${sectionId}/topics/${topicId}`, topicData);

      console.log('Обновленная тема:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении темы:', error.response?.data || error.message);
      throw error;
    }
  }

  // 🔹 Удаление темы
  async deleteTopic(sectionId, topicId) {
    try {
const response = await axios.delete(`${API_URL}/sections/${sectionId}/topics/${topicId}`);

      console.log('Удаленная тема:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при удалении темы:', error.response?.data || error.message);
      throw error;
    }
  }

  // 🔹 Получение постов по теме
  async getPostsByTopic(sectionId, topicId) {
    try {
      const response = await axios.get(`${API_URL}/sections/${sectionId}/topics/${topicId}/posts`);
      console.log('Полученные посты:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении постов:', error.response?.data || error.message);
      throw error;
    }
  }

  // 🔹 Создание поста в теме
async createPost(sectionId, topicId, postData) {
  try {
    const response = await axios.post(`${API_URL}/sections/${sectionId}/topics/${topicId}/posts`, postData);
    console.log('Созданный пост:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании поста:', error.response?.data || error.message);
    throw error;
  }
}

  // 🔹 Обновление поста
  async updatePost(postId, postData) {
    try {
const response = await axios.put(`${API_URL}/posts/${postId}`, postData);

      console.log('Обновленный пост:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении поста:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new ForumService();
