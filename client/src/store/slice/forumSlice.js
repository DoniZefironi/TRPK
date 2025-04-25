// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { 
//   fetchAllForums, 
//   fetchForumById, 
//   createForum 
// } from '../../service/ForumService';

// const initialState = {
//   forums: [],
//   currentForum: null,
//   status: 'idle',
//   error: null,
// };

// export const fetchForums = createAsyncThunk(
//   'forum/fetchForums',
//   async (params, { rejectWithValue }) => {
//     try {
//       return await fetchAllForums(params);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchForum = createAsyncThunk(
//   'forum/fetchForumById',
//   async (id, { rejectWithValue }) => {
//     try {
//       return await fetchForumById(id);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const createNewForum = createAsyncThunk(
//   'forum/createForum',
//   async (forumData, { rejectWithValue }) => {
//     try {
//       return await createForum(forumData);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const forumSlice = createSlice({
//   name: 'forum',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchForums.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchForums.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.forums = action.payload;
//       })
//       .addCase(fetchForums.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(fetchForum.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchForum.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.currentForum = action.payload;
//       })
//       .addCase(fetchForum.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(createNewForum.fulfilled, (state, action) => {
//         state.forums.push(action.payload);
//       });
//   },
// });

// export default forumSlice.reducer;