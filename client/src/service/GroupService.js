import axios from 'axios';

const API_URL = 'http://localhost:2280/api'; 

// Запросы для работы с группами
export const fetchGroups = async (course) => {
  try {
    const response = await axios.get(`${API_URL}/group/${course}/all`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения групп');
  }
};

export const createGroup = async (course, data) => {
  try {
    const response = await axios.post(`${API_URL}/group/${course}/create`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка создания группы');
  }
};

export const updateGroup = async (course, id, data) => {
  try {
    const response = await axios.put(`${API_URL}/group/${course}/updateg/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления группы');
  }
};

export const deleteGroup = async (course, id) => {
  try {
    await axios.delete(`${API_URL}/group/${course}/delete/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления группы');
  }
};
