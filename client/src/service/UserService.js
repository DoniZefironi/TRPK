import axios from 'axios';

const API_URL = 'http://localhost:2280/api/user';

export const fetchUserInfo = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const updateUserInfo = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/${userId}`, userData);
  return response.data;
};
