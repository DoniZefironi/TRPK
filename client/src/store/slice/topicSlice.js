// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { 
//     fetchTopicsBySection, 
//     fetchTopicById, 
//     createTopic 
//   } from '../../service/TopicService';

// const initialState = {
//   topics: [],
//   currentTopic: null,
//   status: 'idle',
//   error: null,
//   pagination: {
//     page: 1,
//     limit: 15,
//     total: 0,
//     totalPages: 1,
//   },
// };

// export const fetchTopicsBySection = createAsyncThunk(
//   'topic/fetchTopicsBySection',
//   async ({ sectionId, params }, { rejectWithValue }) => {
//     try {
//       return await topicService.getBySection(sectionId, params);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const fetchTopicById = createAsyncThunk(
//   'topic/fetchTopicById',
//   async (id, { rejectWithValue }) => {
//     try {
//       return await topicService.getOne(id);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createTopic = createAsyncThunk(
//   'topic/createTopic',
//   async (topicData, { rejectWithValue }) => {
//     try {
//       return await topicService.create(topicData);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const topicSlice = createSlice({
//   name: 'topic',
//   initialState,
//   reducers: {
//     incrementViews: (state) => {
//       if (state.currentTopic) {
//         state.currentTopic.views += 1;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTopicsBySection.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTopicsBySection.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.topics = action.payload.data;
//         state.pagination = action.payload.pagination;
//       })
//       .addCase(fetchTopicsBySection.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(fetchTopicById.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTopicById.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.currentTopic = action.payload;
//       })
//       .addCase(fetchTopicById.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(createTopic.fulfilled, (state, action) => {
//         state.topics.unshift(action.payload);
//       });
//   },
// });

// export const { incrementViews } = topicSlice.actions;
// export default topicSlice.reducer;