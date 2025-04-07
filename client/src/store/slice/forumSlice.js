import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchForums,
  fetchForumById,
  createTopic,
  fetchTopicsBySection,
  fetchTopicById,
  createPost,
  fetchPostsByTopic
} from '../../service/ForumService';

// Асинхронные экшены
export const getForums = createAsyncThunk(
  'forum/getForums',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchForums();
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения форумов');
    }
  }
);

export const getForumById = createAsyncThunk(
  'forum/getForumById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchForumById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения форума');
    }
  }
);

export const addTopic = createAsyncThunk(
  'forum/addTopic',
  async (topicData, { rejectWithValue }) => {
    try {
      return await createTopic(topicData);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка создания темы');
    }
  }
);

export const getTopicsBySection = createAsyncThunk(
  'forum/getTopicsBySection',
  async ({ sectionType, sectionId }, { rejectWithValue }) => {
    try {
      return await fetchTopicsBySection(sectionType, sectionId);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения тем');
    }
  }
);

export const getTopicById = createAsyncThunk(
  'forum/getTopicById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchTopicById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения темы');
    }
  }
);

export const addPost = createAsyncThunk(
  'forum/addPost',
  async (postData, { rejectWithValue }) => {
    try {
      return await createPost(postData);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка создания сообщения');
    }
  }
);

export const getPostsByTopic = createAsyncThunk(
  'forum/getPostsByTopic',
  async (topicId, { rejectWithValue }) => {
    try {
      return await fetchPostsByTopic(topicId);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения сообщений');
    }
  }
);

// Слайс
const forumSlice = createSlice({
  name: 'forum',
  initialState: {
    forums: [],
    currentForum: null,
    topics: [],
    currentTopic: null,
    posts: [],
    isLoading: false,
    error: null
  },
  reducers: {
    clearForumState: (state) => {
      state.currentForum = null;
      state.currentTopic = null;
      state.posts = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение форумов
      .addCase(getForums.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getForums.fulfilled, (state, action) => {
        state.forums = action.payload;
        state.isLoading = false;
      })
      .addCase(getForums.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      
      // Получение форума по ID
      .addCase(getForumById.fulfilled, (state, action) => {
        state.currentForum = action.payload;
      })
      
      // Получение тем по разделу
      .addCase(getTopicsBySection.fulfilled, (state, action) => {
        state.topics = action.payload;
      })
      
      // Получение темы по ID
      .addCase(getTopicById.fulfilled, (state, action) => {
        state.currentTopic = action.payload;
      })
      
      // Добавление темы
      .addCase(addTopic.fulfilled, (state, action) => {
        state.topics.push(action.payload);
      })
      
      // Получение сообщений по теме
      .addCase(getPostsByTopic.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      
      // Добавление сообщения
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  }
});

export const { clearForumState } = forumSlice.actions;
export default forumSlice.reducer;