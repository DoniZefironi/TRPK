import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCompetitions, createCompetition, updateCompetition, deleteCompetition, fetchResults, addResult } from '../../service/CompetitionService';

// Асинхронные экшены
export const getCompetitions = createAsyncThunk('competitions/getCompetitions', async (type) => {
    return await fetchCompetitions(type);
});

export const addCompetition = createAsyncThunk('competitions/addCompetition', async ({ type, data }) => {
    return await createCompetition(type, data);
});

export const editCompetition = createAsyncThunk('competitions/editCompetition', async ({ type, id, data }) => {
    return await updateCompetition(type, id, data);
});

export const removeCompetition = createAsyncThunk('competitions/removeCompetition', async ({ type, id }) => {
    return await deleteCompetition(type, id);
});

// Управление результатами
export const getResults = createAsyncThunk('competitions/getResults', async ({ type, id_competition }) => {
    return await fetchResults(type, id_competition);
});

export const addCompetitionResult = createAsyncThunk('competitions/addResult', async ({ type, data }) => {
    return await addResult(type, data);
});

// Слайс управления соревнованиями
const competitionSlice = createSlice({
    name: 'competitions',
    initialState: {
        items: [],
        results: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompetitions.pending, (state) => { state.loading = true; })
            .addCase(getCompetitions.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(getCompetitions.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            .addCase(addCompetition.fulfilled, (state, action) => { state.items.push(action.payload); })
            .addCase(editCompetition.fulfilled, (state, action) => {
                const index = state.items.findIndex((comp) => comp.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(removeCompetition.fulfilled, (state, action) => {
                state.items = state.items.filter((comp) => comp.id !== action.payload);
            })
            .addCase(getResults.fulfilled, (state, action) => { state.results = action.payload; })
            .addCase(addCompetitionResult.fulfilled, (state, action) => { state.results.push(action.payload); });
    }
});

export default competitionSlice.reducer;
