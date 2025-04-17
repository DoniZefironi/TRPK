import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGroups, createGroup, updateGroup, deleteGroup } from '../../service/GroupService';

// Асинхронные экшены
export const getGroups = createAsyncThunk('groups/getGroups', async (course) => {
    return await fetchGroups(course);
});

export const addGroup = createAsyncThunk('groups/addGroup', async ({ course, data }) => {
    return await createGroup(course, data);
});

export const editGroup = createAsyncThunk('groups/editGroup', async ({ course, id, data }) => {
    return await updateGroup(course, id, data);
});

export const removeGroup = createAsyncThunk('groups/removeGroup', async ({ course, id }) => {
    return await deleteGroup(course, id);
});

// Слайс управления группами
const groupSlice = createSlice({
    name: 'groups',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGroups.pending, (state) => { state.loading = true; })
            .addCase(getGroups.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(getGroups.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            .addCase(addGroup.fulfilled, (state, action) => { state.items.push(action.payload); })
            .addCase(editGroup.fulfilled, (state, action) => {
                const index = state.items.findIndex((g) => g.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(removeGroup.fulfilled, (state, action) => {
                state.items = state.items.filter((g) => g.id !== action.payload);
            });
    }
});

export default groupSlice.reducer;
