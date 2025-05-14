import axios from 'axios';

const API_URL = 'http://localhost:2280/api/projects';

const projectService = {
  async createProject(course, data) {
    const response = await axios.post(`${API_URL}/${course}`, data);
    return response.data;
  },

  async getProjects(course, params = {}) {
    const response = await axios.get(`${API_URL}/${course}`, { params });
    return response.data;
  },

  async getProject(course, id) {
    const response = await axios.get(`${API_URL}/${course}/${id}`);
    return response.data;
  },

  async updateProject(course, id, data) {
    const response = await axios.put(`${API_URL}/${course}/${id}`, data);
    return response.data;
  },

  async deleteProject(course, id) {
    const response = await axios.delete(`${API_URL}/${course}/${id}`);
    return response.data;
  },

  async addTeamMember(course, id, userId) {
    const response = await axios.post(`${API_URL}/${course}/${id}/team`, { userId });
    return response.data;
  },

  async removeTeamMember(course, id, userId) {
    const response = await axios.delete(`${API_URL}/${course}/${id}/team/${userId}`);
    return response.data;
  },
};

export default projectService;
