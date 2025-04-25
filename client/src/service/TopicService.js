import axios from 'axios';

const API_URL = 'http://localhost:2280/api/topic';

// 🔹 Получение тем по разделу
export const fetchTopicsBySection = async (sectionId, params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/section/${sectionId}`, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[TopicService] Ошибка получения тем:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка загрузки тем');
  }
};

// 🔹 Получение темы по ID
export const fetchTopicById = async (topicId) => {
  try {
    const response = await axios.get(`${API_URL}/${topicId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[TopicService] Ошибка получения темы:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка загрузки темы');
  }
};

// 🔹 Создание темы
export const createTopic = async (topicData) => {
  try {
    const response = await axios.post(`${API_URL}`, topicData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[TopicService] Ошибка создания темы:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка создания темы');
  }
};

// 🔹 Обновление темы
export const updateTopic = async ({ topicId, topicData }) => {
  try {
    const response = await axios.put(`${API_URL}/${topicId}`, topicData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[TopicService] Ошибка обновления темы:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка обновления темы');
  }
};

// 🔹 Удаление темы
export const deleteTopic = async (topicId) => {
  try {
    const response = await axios.delete(`${API_URL}/${topicId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[TopicService] Ошибка удаления темы:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка удаления темы');
  }
};