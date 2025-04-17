import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLectures, createLecture, updateLecture, deleteLecture } from '../../service/LectureService';

// Асинхронные экшены
export const getLectures = createAsyncThunk('lectures/getLectures', async (course) => {
    return await fetchLectures(course);
});

export const addLecture = createAsyncThunk('lectures/addLecture', async ({ course, data }) => {
    return await createLecture(course, data);
});

export const editLecture = createAsyncThunk('lectures/editLecture', async ({ course, id, data }) => {
    return await updateLecture(course, id, data);
});

export const removeLecture = createAsyncThunk('lectures/removeLecture', async ({ course, id }) => {
    return await deleteLecture(course, id);
});

// Слайс управления лекциями
const lectureSlice = createSlice({
    name: 'lectures',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLectures.pending, (state) => { state.loading = true; })
            .addCase(getLectures.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(getLectures.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            .addCase(addLecture.fulfilled, (state, action) => { state.items.push(action.payload); })
            .addCase(editLecture.fulfilled, (state, action) => {
                const index = state.items.findIndex((l) => l.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(removeLecture.fulfilled, (state, action) => {
                state.items = state.items.filter((l) => l.id !== action.payload);
            });
    }
});

export default lectureSlice.reducer;
