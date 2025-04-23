import axios from 'axios';

const API_URL = 'http://localhost:2280/api';

const getCourse = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.permissions; 
};

// Запросы для работы с журналом
export const fetchJournalEntries = async (course) => {
  try {
    const course = getCourse(); 
    const response = await axios.get(`${API_URL}/journal/${course}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения журнала');
  }
};

export const createJournalEntry = async (course, data) => {
  try {
    const course = getCourse(); 
    const response = await axios.post(`${API_URL}/journal/${course}/grades`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка добавления записи');
  }
};

export const updateJournalEntry = async (course, id, data) => {
  try {
    const course = getCourse(); 
    const response = await axios.put(`${API_URL}/journal/${course}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления записи');
  }
};

export const deleteJournalEntry = async (course, id) => {
  try {
    const course = getCourse(); 
    await axios.delete(`${API_URL}/journal/${course}/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления записи');
  }
};
