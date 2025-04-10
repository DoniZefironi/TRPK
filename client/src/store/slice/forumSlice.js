import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchSections,
  fetchSectionById,
  fetchTopicsBySection,
  createTopic,
  fetchTopic,
  fetchPostsByTopic,
  createPost
} from './forumThunks'; // Импортируем все thunks

const initialState = {
  sections: [],
  currentSection: null,
  topics: [],
  currentTopic: null,
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  lastFetch: null,
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    clearForumState: (state) => {
      state.currentSection = null;
      state.topics = [];
      state.currentTopic = null;
      state.posts = [];
      state.status = 'idle';
      state.error = null;
    },
    resetForumStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sections
      .addCase(fetchSections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sections = action.payload;
        state.lastFetch = Date.now();
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch single section
      .addCase(fetchSectionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSectionById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentSection = action.payload;
      })
      .addCase(fetchSectionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch topics by section
      .addCase(fetchTopicsBySection.pending, (state) => {
        state.status = 'loading';
        state.topics = [];
      })
      .addCase(fetchTopicsBySection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topics = action.payload;
      })
      .addCase(fetchTopicsBySection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create topic
      .addCase(createTopic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topics.unshift(action.payload);
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch single topic
      .addCase(fetchTopic.pending, (state) => {
        state.status = 'loading';
        state.currentTopic = null;
      })
      .addCase(fetchTopic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTopic = action.payload;
      })
      .addCase(fetchTopic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.currentTopic = null;
      })

      // Fetch posts by topic
      .addCase(fetchPostsByTopic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsByTopic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPostsByTopic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { 
  setCurrentSection, 
  clearForumState,
  resetForumStatus 
} = forumSlice.actions;

export default forumSlice.reducer;

export const selectForumStatus = (state) => state.forum.status;
export const selectForumError = (state) => state.forum.error;
export const selectAllSections = (state) => state.forum.sections;
export const selectCurrentSection = (state) => state.forum.currentSection;
export const selectTopicsBySection = (state) => state.forum.topics;
export const selectCurrentTopic = (state) => state.forum.currentTopic;
export const selectPostsByTopic = (state) => state.forum.posts;