import axios from 'axios';

const API_URL = 'http://localhost:2280/api/groups';

const getGroups = async (course, page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/${course}`, {
    params: { page, limit }
  });
  return response.data;
};

const getGroupDetails = async (course, id) => {
  if (!course || !id) {
    throw new Error('Course and ID are required');
  }
  const response = await axios.get(`${API_URL}/${course}/${id}`);
  return response.data;
};

const createGroup = async (groupData) => {
  const response = await axios.post(API_URL, groupData);
  return response.data;
};

const updateGroup = async (course, id, groupData) => {
  const response = await axios.put(`${API_URL}/${course}/${id}`, groupData);
  return response.data;
};

const deleteGroup = async (course, id) => {
  await axios.delete(`${API_URL}/${course}/${id}`);
};

const addMember = async (course, id, memberData) => {
  const response = await axios.post(`${API_URL}/${course}/${id}/members`, memberData);
  return response.data;
};

const getGroupMembers = async (course, id) => {
  if (!course || !id) {
    throw new Error('Course and ID are required');
  }
  const response = await axios.get(`${API_URL}/${course}/${id}/members`);
  return response.data;
};

const updateMember = async (course, id, userId, memberData) => {
  const response = await axios.put(`${API_URL}/${course}/${id}/members/${userId}`, memberData);
  return response.data;
};

const removeMember = async (course, id, userId) => {
  await axios.delete(`${API_URL}/${course}/${id}/members/${userId}`);
};

export default {
  getGroups,
  getGroupDetails,
  createGroup,
  updateGroup,
  deleteGroup,
  addMember,
  getGroupMembers,
  updateMember,
  removeMember
};