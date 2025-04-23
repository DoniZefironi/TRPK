import axios from 'axios';

const API_URL = 'http://localhost:2280/api/user';

// Настройка axios для работы с credentials
axios.defaults.withCredentials = true;

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (!response.data?.accessToken) {
      throw new Error('Сервер не вернул токен доступа');
    }
    return {
      user: response.data.user,
      token: response.data.accessToken
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Ошибка регистрации';
    throw new Error(errorMessage);
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    
    if (!response.data?.accessToken) {
      throw new Error('Server did not return access token');
    }
    
    return {
      user: response.data.user,
      token: response.data.accessToken
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Login error';
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    return true;
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    throw new Error('Ошибка при выходе из системы');
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/refresh`);
    if (!response.data?.accessToken) {
      throw new Error('Не удалось обновить токен');
    }
    return {
      user: response.data.user,
      token: response.data.accessToken
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления токена');
  }
};