import axios from 'axios';

const API_URL = 'http://localhost:2280/api/post';

// 🔹 Получение сообщений по теме
export const fetchPostsByTopic = async (topicId, params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/topic/${topicId}`, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[PostService] Ошибка получения сообщений:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка загрузки сообщений');
  }
};

// 🔹 Создание сообщения
export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[PostService] Ошибка создания сообщения:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка создания сообщения');
  }
};

// 🔹 Обновление сообщения
export const updatePost = async ({ postId, postData }) => {
  try {
    const response = await axios.put(`${API_URL}/${postId}`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[PostService] Ошибка обновления сообщения:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка обновления сообщения');
  }
};

// 🔹 Удаление сообщения
export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[PostService] Ошибка удаления сообщения:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка удаления сообщения');
  }
};