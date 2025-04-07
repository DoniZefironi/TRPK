import axios from 'axios';

const API_URL = 'http://localhost:2280/api/forum';

// Форум
export const fetchForums = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchForumById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Темы
export const createTopic = async (topicData) => {
  const response = await axios.post(`${API_URL}/topics`, topicData);
  return response.data;
};

export const fetchTopicsBySection = async (sectionType, sectionId) => {
  const response = await axios.get(`${API_URL}/sections/${sectionType}/${sectionId}/topics`);
  return response.data;
};

export const fetchTopicById = async (id) => {
  const response = await axios.get(`${API_URL}/topics/${id}`);
  return response.data;
};

// Сообщения
export const createPost = async (postData) => {
  const response = await axios.post(`${API_URL}/posts`, postData);
  return response.data;
};

export const fetchPostsByTopic = async (topicId) => {
  const response = await axios.get(`${API_URL}/topics/${topicId}/posts`);
  return response.data;
};

// Добавьте default export, если хотите сохранить обратную совместимость
const ForumService = {
  fetchForums,
  fetchForumById,
  createTopic,
  fetchTopicsBySection,
  fetchTopicById,
  createPost,
  fetchPostsByTopic
};

export default ForumService;