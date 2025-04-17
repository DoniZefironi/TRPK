import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJournalEntries, createJournalEntry, updateJournalEntry, deleteJournalEntry } from '../../service/JournalService';

// Асинхронные экшены
export const getJournalEntries = createAsyncThunk('journal/getEntries', async (course) => {
    return await fetchJournalEntries(course);
});

export const addJournalEntry = createAsyncThunk('journal/addEntry', async ({ course, data }) => {
    return await createJournalEntry(course, data);
});

export const editJournalEntry = createAsyncThunk('journal/editEntry', async ({ course, id, data }) => {
    return await updateJournalEntry(course, id, data);
});

export const removeJournalEntry = createAsyncThunk('journal/removeEntry', async ({ course, id }) => {
    return await deleteJournalEntry(course, id);
});

// Слайс управления журналом
const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJournalEntries.pending, (state) => { state.loading = true; })
            .addCase(getJournalEntries.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(getJournalEntries.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            .addCase(addJournalEntry.fulfilled, (state, action) => { state.items.push(action.payload); })
            .addCase(editJournalEntry.fulfilled, (state, action) => {
                const index = state.items.findIndex((entry) => entry.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(removeJournalEntry.fulfilled, (state, action) => {
                state.items = state.items.filter((entry) => entry.id !== action.payload);
            });
    }
});

export default journalSlice.reducer;
