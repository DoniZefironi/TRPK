import axios from 'axios';

const API_URL = 'http://localhost:2280/api/user';

// Получение информации о пользователе
export const fetchUserProfile = async (userId) => {
  try {
    console.log('[UserService] Запрос профиля для userId:', userId);
    const response = await axios.get(`${API_URL}/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      validateStatus: function (status) {
        return status < 500; // Разрешаем все статусы меньше 500
      }
    });

    console.log('[UserService] Ответ сервера:', {
      status: response.status,
      data: response.data
    });

    if (response.status === 404) {
      throw new Error('Пользователь не найден');
    }

    if (!response.data) {
      throw new Error('Сервер не вернул данные');
    }

    return response.data;
  } catch (error) {
    console.error('[UserService] Ошибка:', {
      message: error.message,
      response: error.response?.data
    });
    throw error;
  }
};

// Обновление информации о пользователе
export const updateUserProfile = async (userId, userData, avatar) => {
  try {
    const formData = new FormData();

    // Добавляем только измененные поля
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    if (avatar instanceof File) {
      formData.append('avatar', avatar);
    }

    const response = await axios.put(
      `${API_URL}/profile/${userId}`, 
      formData, 
      {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Failed to update user data';
    throw new Error(errorMessage);
  }
};