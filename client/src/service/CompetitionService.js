import axios from 'axios';

const API_URL = 'http://localhost:2280/api';

// Запросы для соревнований
export const fetchCompetitions = async (type) => {
  try {
    const response = await axios.get(`${API_URL}/${type}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения соревнований');
  }
};

export const createCompetition = async (type, data) => {
  try {
    const response = await axios.post(`${API_URL}/${type}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка создания соревнования');
  }
};

export const updateCompetition = async (type, id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${type}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка обновления соревнования');
  }
};

export const deleteCompetition = async (type, id) => {
  try {
    await axios.delete(`${API_URL}/${type}/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка удаления соревнования');
  }
};

// Запросы для результатов
export const fetchResults = async (type, id_competition) => {
  try {
    const response = await axios.get(`${API_URL}/${type}/results/${id_competition}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения результатов');
  }
};

export const addResult = async (type, data) => {
  try {
    const response = await axios.post(`${API_URL}/${type}/results`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка добавления результата');
  }
};
