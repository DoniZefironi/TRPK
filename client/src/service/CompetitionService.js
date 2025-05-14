import axios from 'axios';

const API_BASE_URL = 'http://localhost:2280/api/competitions';

const competitionService = {
  // Competition CRUD operations
  getCompetitions: async (type, params = {}) => {
    const response = await axios.get(`${API_BASE_URL}/${type}`, { params });
    return response.data;
  },

  getCompetition: async (type, id) => {
    const response = await axios.get(`${API_BASE_URL}/${type}/${id}`);
    return response.data;
  },

  createCompetition: async (type, competitionData) => {
    const response = await axios.post(`${API_BASE_URL}/${type}`, competitionData);
    return response.data;
  },

  updateCompetition: async (type, id, competitionData) => {
    const response = await axios.put(`${API_BASE_URL}/${type}/${id}`, competitionData);
    return response.data;
  },

  deleteCompetition: async (type, id) => {
    const response = await axios.delete(`${API_BASE_URL}/${type}/${id}`);
    return response.data;
  },

  // Results operations
  getResults: async (type, competitionId, params = {}) => {
    const response = await axios.get(`${API_BASE_URL}/${type}/results/${competitionId}`, { params });
    return response.data;
  },

  addResult: async (type, resultData) => {
    const response = await axios.post(`${API_BASE_URL}/${type}/results`, resultData);
    return response.data;
  }
};

export default competitionService;