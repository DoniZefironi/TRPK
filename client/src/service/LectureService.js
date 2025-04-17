import axios from 'axios';

const API_URL = 'http://localhost:2280/api'; // Укажи свой серверный URL

// Запросы для работы с лекциями
export const fetchLectures = async (course) => {
  try {
    const response = await axios.get(`${API_URL}/${course}/lectures`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения лекций');
  }
};

export const createLecture = async (course, data) => {
  try {
    const response = await axios.post(`${API_URL}/${course}/lectures`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка создания лекции');
  }
};

export const updateLecture = async (course, id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${course}/lectures/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления лекции');
  }
};

export const deleteLecture = async (course, id) => {
  try {
    await axios.delete(`${API_URL}/${course}/lectures/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления лекции');
  }
};
