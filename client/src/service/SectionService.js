import axios from 'axios';

const API_URL = 'http://localhost:2280/api/section';

// 🔹 Получение разделов по форуму
export const fetchSectionsByForum = async (forumId) => {
  try {
    const response = await axios.get(`${API_URL}/forum/${forumId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[SectionService] Ошибка получения разделов:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка загрузки разделов');
  }
};

// 🔹 Получение раздела по ID
export const fetchSectionById = async (sectionId) => {
  try {
    const response = await axios.get(`${API_URL}/${sectionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[SectionService] Ошибка получения раздела:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка загрузки раздела');
  }
};

// 🔹 Создание раздела
export const createSection = async (sectionData) => {
  try {
    const response = await axios.post(`${API_URL}`, sectionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[SectionService] Ошибка создания раздела:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка создания раздела');
  }
};

// 🔹 Обновление раздела
export const updateSection = async ({ sectionId, sectionData }) => {
  try {
    const response = await axios.put(`${API_URL}/${sectionId}`, sectionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[SectionService] Ошибка обновления раздела:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка обновления раздела');
  }
};

// 🔹 Удаление раздела
export const deleteSection = async (sectionId) => {
  try {
    const response = await axios.delete(`${API_URL}/${sectionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('[SectionService] Ошибка удаления раздела:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Ошибка удаления раздела');
  }
};