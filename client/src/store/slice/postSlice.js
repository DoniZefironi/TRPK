// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { 
//     fetchPostsByTopic, 
//     createPost 
//   } from '../../service/PostService';

// const initialState = {
//   posts: [],
//   status: 'idle',
//   error: null,
//   pagination: {
//     page: 1,
//     limit: 20,
//     total: 0,
//     totalPages: 1,
//   },
// };

// export const fetchPostsByTopic = createAsyncThunk(
//   'post/fetchPostsByTopic',
//   async ({ topicId, params }, { rejectWithValue }) => {
//     try {
//       return await postService.getByTopic(topicId, params);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createPost = createAsyncThunk(
//   'post/createPost',
//   async (postData, { rejectWithValue }) => {
//     try {
//       return await postService.create(postData);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const postSlice = createSlice({
//   name: 'post',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPostsByTopic.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPostsByTopic.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.posts = action.payload.posts;
//         state.pagination = action.payload.pagination;
//       })
//       .addCase(fetchPostsByTopic.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(createPost.fulfilled, (state, action) => {
//         state.posts.push(action.payload);
//       });
//   },
// });

// export default postSlice.reducer;