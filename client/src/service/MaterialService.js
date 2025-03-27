import axios from 'axios';

const API_URL = 'http://localhost:2280/api/material';

// Создание нового материала
export const createMaterial = async (materialData) => {
  const response = await axios.post(API_URL, materialData);
  return response.data;
};
  // Обновление материала
  export const updateMaterialById = async (id_material, materialData) => {
    const response = await axios.put(`${API_URL}/${id_material}`, materialData);
    return response.data;
  };
  
// Получение всех материалов
export const fetchAllMaterials = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Получение материала по ID
export const fetchMaterialById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Удаление материала по ID
export const deleteMaterial = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
