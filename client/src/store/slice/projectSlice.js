import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../service/ProjectSlice';

// Асинхронные экшены
export const getProjects = createAsyncThunk('projects/getProjects', async (course) => {
    return await fetchProjects(course);
});

export const addProject = createAsyncThunk('projects/addProject', async ({ course, data }) => {
    return await createProject(course, data);
});

export const editProject = createAsyncThunk('projects/editProject', async ({ course, id, data }) => {
    return await updateProject(course, id, data);
});

export const removeProject = createAsyncThunk('projects/removeProject', async ({ course, id }) => {
    return await deleteProject(course, id);
});

// Слайс управления проектами
const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => { state.loading = true; })
            .addCase(getProjects.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(getProjects.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            .addCase(addProject.fulfilled, (state, action) => { state.items.push(action.payload); })
            .addCase(editProject.fulfilled, (state, action) => {
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(removeProject.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p.id !== action.payload);
            });
    }
});

export default projectSlice.reducer;
