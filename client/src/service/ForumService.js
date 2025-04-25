import axios from 'axios';

const API_URL = 'http://localhost:2280/api/forum';

// 🔹 Получение всех форумов
export const fetchAllForums = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[ForumService] Ошибка получения списка форумов:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка загрузки списка форумов');
  }
};

// 🔹 Получение форума по ID
export const fetchForumById = async (forumId) => {
  try {
    const response = await axios.get(`${API_URL}/${forumId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.data) {
      throw new Error('Сервер не вернул данные');
    }

    return response.data;
  } catch (error) {
    console.error('[ForumService] Ошибка получения форума:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка загрузки форума');
  }
};

// 🔹 Создание нового форума
export const createForum = async (forumData) => {
  try {
    const response = await axios.post(`${API_URL}`, forumData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[ForumService] Ошибка создания форума:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка создания форума');
  }
};

// 🔹 Обновление форума
export const updateForum = async ({ forumId, forumData }) => {
  try {
    const response = await axios.put(`${API_URL}/${forumId}`, forumData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[ForumService] Ошибка обновления форума:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка обновления форума');
  }
};

// 🔹 Удаление форума
export const deleteForum = async (forumId) => {
  try {
    const response = await axios.delete(`${API_URL}/${forumId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[ForumService] Ошибка удаления форума:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка удаления форума');
  }
};