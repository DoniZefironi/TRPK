import axios from 'axios';

const API_URL = 'http://localhost:2280/api/user';

// Получение данных пользователя
export const fetchUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
};

// Обновление данных пользователя
export const updateUserInfo = async (userId, userData, avatar) => {
  try {
    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    if (avatar) {
      formData.append('avatar', avatar);
    }

    const response = await axios.put(`${API_URL}/${userId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user data');
  }
};