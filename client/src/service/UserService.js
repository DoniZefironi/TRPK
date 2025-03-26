import axios from 'axios';

const API_URL = 'http://localhost:2280/api/user';

// Получение данных пользователя
export const fetchUserInfo = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const updateUserInfo = async (userId, userData, avatar) => {
  try {
    const formData = new FormData();
    
    // Добавляем только измененные поля
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    if (avatar) {
      formData.append('avatar', avatar);
    }

    const token = localStorage.getItem('token');
    const response = await axios.put(`/api/user/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:2280'
    });

    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};