import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/CompetitionService';

// Async thunks for competitions
export const fetchCompetitions = createAsyncThunk(
  'competitions/fetchCompetitions',
  async ({ type, params }, { rejectWithValue }) => {
    try {
      const response = await api.getCompetitions(type, params);
      return { type, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCompetitionDetails = createAsyncThunk(
  'competitions/fetchCompetitionDetails',
  async ({ type, id }, { rejectWithValue }) => {
    try {
      const response = await api.getCompetition(type, id);
      return { type, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewCompetition = createAsyncThunk(
  'competitions/createNewCompetition',
  async ({ type, competitionData }, { rejectWithValue }) => {
    try {
      const response = await api.createCompetition(type, competitionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCompetition = createAsyncThunk(
  'competitions/updateCompetition',
  async ({ type, id, competitionData }, { rejectWithValue }) => {
    try {
      const response = await api.updateCompetition(type, id, competitionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCompetition = createAsyncThunk(
  'competitions/deleteCompetition',
  async ({ type, id }, { rejectWithValue }) => {
    try {
      await api.deleteCompetition(type, id);
      return { type, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunks for results
export const fetchCompetitionResults = createAsyncThunk(
  'competitions/fetchCompetitionResults',
  async ({ type, competitionId, params }, { rejectWithValue }) => {
    try {
      const response = await api.getResults(type, competitionId, params);
      return { type, competitionId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCompetitionResult = createAsyncThunk(
  'competitions/addCompetitionResult',
  async ({ type, resultData }, { rejectWithValue }) => {
    try {
      const response = await api.addResult(type, resultData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const competitionSlice = createSlice({
  name: 'competitions',
  initialState: {
    hackathon: {
      list: [],
      details: null,
      results: {},
      loading: false,
      error: null,
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1
      }
    },
    olympiad: {
      list: [],
      details: null,
      results: {},
      loading: false,
      error: null,
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1
      }
    }
  },
  reducers: {
    clearCompetitionDetails: (state, action) => {
      const { type } = action.payload;
      state[type].details = null;
    },
    clearCompetitionError: (state, action) => {
      const { type } = action.payload;
      state[type].error = null;
    }
  },
  extraReducers: (builder) => {
    // Competitions list
    builder.addCase(fetchCompetitions.pending, (state, action) => {
      const { type } = action.meta.arg;
      state[type].loading = true;
      state[type].error = null;
    });
    builder.addCase(fetchCompetitions.fulfilled, (state, action) => {
      const { type, data } = action.payload;
      state[type].list = data.data;
      state[type].pagination = {
        page: data.pagination.page,
        limit: data.pagination.limit,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages
      };
      state[type].loading = false;
    });
    builder.addCase(fetchCompetitions.rejected, (state, action) => {
      const { type } = action.meta.arg;
      state[type].loading = false;
      state[type].error = action.payload?.message || action.error.message;
    });

    // Competition details
    builder.addCase(fetchCompetitionDetails.pending, (state, action) => {
      const { type } = action.meta.arg;
      state[type].loading = true;
      state[type].error = null;
    });
    builder.addCase(fetchCompetitionDetails.fulfilled, (state, action) => {
      const { type, data } = action.payload;
      state[type].details = data;
      state[type].loading = false;
    });
    builder.addCase(fetchCompetitionDetails.rejected, (state, action) => {
      const { type } = action.meta.arg;
      state[type].loading = false;
      state[type].error = action.payload?.message || action.error.message;
    });

    // Create competition
    builder.addCase(createNewCompetition.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewCompetition.fulfilled, (state, action) => {
      const { type } = action.meta.arg;
      state[type].list.unshift(action.payload.data);
      state.loading = false;
    });
    builder.addCase(createNewCompetition.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error.message;
    });

    // Update competition
    builder.addCase(updateCompetition.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCompetition.fulfilled, (state, action) => {
      const { type, id } = action.meta.arg;
      const updatedCompetition = action.payload.data;
      
      // Update in list
      const index = state[type].list.findIndex(c => c.id === id);
      if (index !== -1) {
        state[type].list[index] = updatedCompetition;
      }
      
      // Update in details if currently viewing this competition
      if (state[type].details && state[type].details.id === id) {
        state[type].details = updatedCompetition;
      }
      
      state.loading = false;
    });
    builder.addCase(updateCompetition.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error.message;
    });

    // Delete competition
    builder.addCase(deleteCompetition.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCompetition.fulfilled, (state, action) => {
      const { type, id } = action.payload;
      state[type].list = state[type].list.filter(c => c.id !== id);
      
      // Clear details if currently viewing this competition
      if (state[type].details && state[type].details.id === id) {
        state[type].details = null;
      }
      
      state.loading = false;
    });
    builder.addCase(deleteCompetition.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error.message;
    });

    // Competition results
    builder.addCase(fetchCompetitionResults.pending, (state, action) => {
      const { type, competitionId } = action.meta.arg;
      if (!state[type].results[competitionId]) {
        state[type].results[competitionId] = { loading: true, error: null, data: [] };
      } else {
        state[type].results[competitionId].loading = true;
        state[type].results[competitionId].error = null;
      }
    });
    builder.addCase(fetchCompetitionResults.fulfilled, (state, action) => {
      const { type, competitionId, data } = action.payload;
      state[type].results[competitionId] = {
        loading: false,
        error: null,
        data: data
      };
    });
    builder.addCase(fetchCompetitionResults.rejected, (state, action) => {
      const { type, competitionId } = action.meta.arg;
      state[type].results[competitionId] = {
        loading: false,
        error: action.payload?.message || action.error.message,
        data: []
      };
    });

    // Add competition result
    builder.addCase(addCompetitionResult.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addCompetitionResult.fulfilled, (state, action) => {
      const { type, id_competition } = action.meta.arg.resultData;
      if (!state[type].results[id_competition]) {
        state[type].results[id_competition] = { data: [] };
      }
      state[type].results[id_competition].data.push(action.payload.data);
      state.loading = false;
    });
    builder.addCase(addCompetitionResult.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || action.error.message;
    });
  }
});

export const { clearCompetitionDetails, clearCompetitionError } = competitionSlice.actions;

export default competitionSlice.reducer;