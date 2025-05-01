import axios from 'axios';

const API_URL = `http://localhost:2280/api/career-guidance`;

const getAll = async (page = 1, limit = 10, dateFrom, dateTo, search) => {
  const response = await axios.get(API_URL, {
    params: { page, limit, dateFrom, dateTo, search },
  });
  return response.data;
};

const getById = async (id_guidance) => {
  const response = await axios.get(`${API_URL}/${id_guidance}`);
  return response.data.data;
};

const create = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data.data;
};

const update = async (id_guidance, data) => {
  const response = await axios.put(`${API_URL}/${id_guidance}`, data);
  return response.data.data;
};

const deleteById = async (id_guidance) => {
  await axios.delete(`${API_URL}/${id_guidance}`);
};

const getByDate = async (date) => {
  const response = await axios.get(`${API_URL}/by-date`, { params: { date } });
  return response.data.data;
};

const careerGuidanceService = {
  getAll,
  getById,
  create,
  update,
  delete: deleteById,
  getByDate,
};

export default careerGuidanceService;