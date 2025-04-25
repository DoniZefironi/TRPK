import axios from 'axios';

const API_URL = `http://localhost:2280/api/career-guidance`;

const getAll = async (page = 1, limit = 10, dateFrom, dateTo, search) => {
  const response = await axios.get(API_URL, {
    params: { page, limit, dateFrom, dateTo, search },
  });
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
};

const create = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data.data;
};

const update = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data.data;
};

const deleteById = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
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