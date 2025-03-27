import axios from 'axios';

const API_URL = 'http://localhost:2280/api/user';

// Получение данных пользователя
export const fetchUserInfo = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

// Обновление данных пользователя
export const updateUserInfo = async (userId, userData, avatar) => {
  const formData = new FormData();

  // Добавляем поля из userData
  Object.entries(userData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value); // Только заполненные поля
    }
  });

  // Добавляем аватар, если он передан
  if (avatar) {
    formData.append('avatar', avatar);
  }

  const response = await axios.put(`${API_URL}/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
