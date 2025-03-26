import axios from 'axios';

const API_URL = 'http://localhost:2280/api/user';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const refreshToken = async (token) => {
  const response = await axios.post(`${API_URL}/refresh`, { refreshToken: token });
  return response.data;
};

export const logout = async (token) => {
  await axios.post(`${API_URL}/logout`, { refreshToken: token });
  localStorage.removeItem('token');
};
