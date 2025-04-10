import { createAsyncThunk } from '@reduxjs/toolkit';
import { forumService } from '../../service/ForumService';

// Sections
export const fetchSections = createAsyncThunk(
  'forum/fetchSections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await forumService.getSections();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchSectionById = createAsyncThunk(
  'forum/fetchSectionById',
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await forumService.getSectionById(sectionId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Topics
export const fetchTopicsBySection = createAsyncThunk(
  'forum/fetchTopicsBySection',
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await forumService.getTopicsBySection(sectionId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchTopic = createAsyncThunk(
  'forum/fetchTopic',
  async (topicId, { rejectWithValue }) => {
    try {
      const response = await forumService.getTopic(topicId);
      if (!response.data) {
        throw new Error('Topic not found');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createTopic = createAsyncThunk(
  'forum/createTopic',
  async (topicData, { rejectWithValue }) => {
    try {
      const response = await forumService.createTopic(topicData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Posts
export const fetchPostsByTopic = createAsyncThunk(
  'forum/fetchPostsByTopic',
  async (topicId, { rejectWithValue }) => {
    try {
      const response = await forumService.getPostsByTopic(topicId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'forum/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await forumService.createPost(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);