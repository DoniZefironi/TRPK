import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ForumService from '../../service/ForumService';

// ✅ Получение всех разделов
export const fetchSections = createAsyncThunk(
  'forum/fetchSections',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ForumService.getAllSections();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Создание раздела
export const createSection = createAsyncThunk(
  'forum/createSection',
  async (sectionData, { rejectWithValue }) => {
    try {
      const response = await ForumService.createSection(sectionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Получение темы по ID
export const fetchTopicById = createAsyncThunk(
  'forum/fetchTopicById',
  async ({ section, id }, { rejectWithValue }) => {
    try {
      const response = await ForumService.getTopicById(section, id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Получение постов по теме
export const fetchPostsByTopic = createAsyncThunk(
  'forum/fetchPostsByTopic',
  async ({ section, topicId }, { rejectWithValue }) => {
    try {
      const response = await ForumService.getPostsByTopic(section, topicId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Создание темы
export const createTopic = createAsyncThunk(
  'forum/createTopic',
  async ({ sectionId, topicData }, { rejectWithValue }) => {
    try {
      const response = await ForumService.createTopic(sectionId, topicData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Создание поста
export const createPost = createAsyncThunk(
  'forum/createPost',
  async ({ section, topicId, postData }, { rejectWithValue }) => {
    try {
      const response = await ForumService.createPost(section, topicId, postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Redux Slice
export const forumSlice = createSlice({
  name: 'forum',
  initialState: {
    sections: [],
    currentTopic: null,
    posts: [],
    status: 'idle',
    error: null
  },
  reducers: {
    clearCurrentTopic: (state) => {
      state.currentTopic = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.status = 'loading';
      })
.addCase(fetchSections.fulfilled, (state, action) => {
  state.status = 'succeeded';
  state.sections = action.payload.data?.map(section => ({
    ...section,
    topics: section.topics?.map(topic => ({
      ...topic,
      title: topic.title || 'Новая тема' // Fallback
    })) || []
  })) || [];
})
      .addCase(fetchSections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchTopicById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopicById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTopic = action.payload;
      })
      .addCase(fetchTopicById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchPostsByTopic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsByTopic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload || [];
      })
      .addCase(fetchPostsByTopic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(createTopic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newTopic = action.payload;
        
        const sectionIndex = state.sections.findIndex(s => s.id === newTopic.sectionId);
        if (sectionIndex !== -1) {
          state.sections[sectionIndex].topics = [...state.sections[sectionIndex].topics, newTopic];
        }
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

.addCase(createPost.pending, (state) => {
  state.status = 'loading';
})
.addCase(createPost.fulfilled, (state, action) => {
  state.status = 'succeeded';
  state.posts.push(action.payload);  // Добавление нового поста
})
.addCase(createPost.rejected, (state, action) => {
  state.status = 'failed';
  state.error = action.payload;
});

  }
});

export const { clearCurrentTopic } = forumSlice.actions;
export default forumSlice.reducer;
