import axios from 'axios';

const API_URL = 'http://localhost:2280/api/forum';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - please login again');
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export const forumService = {
  // Sections
  getSections: () => api.get('/sections'),
  getSectionById: (id) => api.get(`/sections/${id}`),
  createSection: (data) => api.post('/sections', data),
  deleteSection: (id) => api.delete(`/sections/${id}`),

  // Topics
  getTopicsBySection: (sectionId) => api.get(`/topics/section/${sectionId}`),
  createTopic: (data) => api.post('/topics', data),
  getTopic: (id) => api.get(`/topics/${id}`),
  updateTopic: (id, data) => api.put(`/topics/${id}`, data),
  deleteTopic: (id) => api.delete(`/topics/${id}`),

  // Posts
  getPostsByTopic: (topicId) => api.get(`/posts/topic/${topicId}`),
  createPost: (data) => api.post('/posts', data),
  deletePost: (id) => api.delete(`/posts/${id}`),
};