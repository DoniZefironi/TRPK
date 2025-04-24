import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import lessonService from '../../service/LectureService';

export const fetchLessons = createAsyncThunk(
    'lessons/fetchLessons',
    async (course, { rejectWithValue }) => {
        try {
            return await lessonService.getAllLessons(course);
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ошибка загрузки уроков');
        }
    }
);

export const lectureSlice = createSlice({
    name: 'lessons',
    initialState: {
        lessons: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLessons.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLessons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lessons = action.payload;
            })
            .addCase(fetchLessons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || action.payload || 'Неизвестная ошибка';
            });
    }
});

export default lectureSlice.reducer;
