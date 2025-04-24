import axios from 'axios';

const API_URL = 'http://localhost:2280/api/user';

// 🔹 Получение пользователя по ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.data) {
      throw new Error('Сервер не вернул данные');
    }

    return response.data;
  } catch (error) {
    console.error('[UserService] Ошибка получения пользователя:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка загрузки пользователя');
  }
};

// 🔹 Обновление пользователя по ID
export const updateUserById = async ({ userId, userData, avatar }) => {
  try {
    const formData = new FormData();

    // Добавляем данные пользователя
    for (const key in userData) {
      if (userData[key] !== undefined && userData[key] !== null && userData[key] !== '') {
        formData.append(key, userData[key]);
      }
    }

    if (avatar) {
      formData.append('avatar', avatar);
    }

    const response = await axios.put(`${API_URL}/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[UserService] Ошибка обновления пользователя:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка обновления пользователя');
  }
};