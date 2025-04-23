import axios from 'axios';

const API_URL = 'http://localhost:2280/api'; 

const getCourse = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.permissions; 
};

export const fetchLectures = async (course) => {
  try {
    const course = getCourse(); 
    const response = await axios.get(`${API_URL}/lesson/${course}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения лекций');
  }
};

export const createLecture = async (course, data) => {
  try {
    const course = getCourse(); 
    const response = await axios.post(`${API_URL}/lesson/${course}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка создания лекции');
  }
};

export const updateLecture = async (course, id, data) => {
  try {
    const course = getCourse(); 
    const response = await axios.put(`${API_URL}/lesson/${course}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления лекции');
  }
};

export const deleteLecture = async (course, id) => {
  try {
    const course = getCourse(); 
    await axios.delete(`${API_URL}/lesson/${course}/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления лекции');
  }
};
