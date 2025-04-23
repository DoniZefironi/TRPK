import axios from 'axios';

const API_URL = 'http://localhost:2280/api';

const getCourse = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.permissions; 
};

export const fetchProjects = async (course) => {
  try {
    const course = getCourse(); 
    const response = await axios.get(`${API_URL}/project/${course}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения проектов');
  }
};

export const createProject = async (course, data) => {
  try {
    const course = getCourse(); 
    const response = await axios.post(`${API_URL}/project/${course}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка создания проекта');
  }
};

export const updateProject = async (course, id, data) => {
  try {
    const course = getCourse(); 
    const response = await axios.put(`${API_URL}/project/${course}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления проекта');
  }
};

export const deleteProject = async (course, id) => {
  try {
    const course = getCourse(); 
    await axios.delete(`${API_URL}/project/${course}/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления проекта');
  }
};
