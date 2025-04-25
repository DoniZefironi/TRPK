// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { 
//   fetchSectionsByForum, 
//   fetchSectionById, 
//   createSection 
// } from '../../service/SectionService';

// const initialState = {
//   sections: [],
//   currentSection: null,
//   status: 'idle',
//   error: null,
// };

// export const fetchSections = createAsyncThunk(
//   'section/fetchSections',
//   async (forumId, { rejectWithValue }) => {
//     try {
//       return await fetchSectionsByForum(forumId);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchSectionById = createAsyncThunk(
//   'section/fetchSectionById',
//   async (id, { rejectWithValue }) => {
//     try {
//       return await sectionService.getOne(id);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createSection = createAsyncThunk(
//   'section/createSection',
//   async (sectionData, { rejectWithValue }) => {
//     try {
//       return await sectionService.create(sectionData);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const sectionSlice = createSlice({
//   name: 'section',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSections.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchSections.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.sections = action.payload;
//       })
//       .addCase(fetchSections.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(fetchSectionById.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchSectionById.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.currentSection = action.payload;
//       })
//       .addCase(fetchSectionById.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(createSection.fulfilled, (state, action) => {
//         state.sections.push(action.payload);
//       });
//   },
// });

// export default sectionSlice.reducer;