import axios from 'axios';

const API_URL = 'http://localhost:2280/api';

// Запросы для работы с журналом
export const fetchJournalEntries = async (course) => {
  try {
    const response = await axios.get(`${API_URL}/${course}/journal`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения журнала');
  }
};

export const createJournalEntry = async (course, data) => {
  try {
    const response = await axios.post(`${API_URL}/${course}/journal`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка добавления записи');
  }
};

export const updateJournalEntry = async (course, id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${course}/journal/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления записи');
  }
};

export const deleteJournalEntry = async (course, id) => {
  try {
    await axios.delete(`${API_URL}/${course}/journal/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления записи');
  }
};
