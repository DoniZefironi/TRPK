import axios from 'axios';

const API_URL = 'http://localhost:2280/api/groups';

const getGroups = async (course, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/${course}`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error.response?.data || error.message);
    throw error;
  }
};

const getGroupDetails = async (course, id) => {
  if (!course || !id) {
    throw new Error('Course and ID are required');
  }
  const response = await axios.get(`${API_URL}/${course}/${id}`);
  return response.data;
};

const createGroup = async (groupData) => {
  const { course, ...data } = groupData;
  const response = await axios.post(`${API_URL}/${course}`, data);
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
  const response = await axios.post(
    `${API_URL}/${course}/${id}/members`, 
    memberData
  );
  return response.data;
};

const getGroupMembers = async (course) => {
  try {
    const response = await axios.get(`${API_URL}/${course}/members/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching group members:', error);
    throw error;
  }
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