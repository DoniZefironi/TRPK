import axios from 'axios';

const API_URL = 'http://localhost:2280/api/sections';

// Функция для добавления секции
export const addSection = async (sectionData) => {
  const response = await axios.post(API_URL, sectionData);
  return response.data;
};

// Функция для получения всех секций
export const fetchSections = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
