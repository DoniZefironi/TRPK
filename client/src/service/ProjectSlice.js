import axios from 'axios';

const API_URL = 'http://localhost:2280/api';

// Запросы для работы с проектами
export const fetchProjects = async (course) => {
  try {
    const response = await axios.get(`${API_URL}/${course}/projects`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения проектов');
  }
};

export const createProject = async (course, data) => {
  try {
    const response = await axios.post(`${API_URL}/${course}/projects`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка создания проекта');
  }
};

export const updateProject = async (course, id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${course}/projects/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления проекта');
  }
};

export const deleteProject = async (course, id) => {
  try {
    await axios.delete(`${API_URL}/${course}/projects/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления проекта');
  }
};
