import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import journalService from '../../service/JournalService';

export const fetchJournal = createAsyncThunk(
  'journal/fetchJournal',
  async ({ course, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      return await journalService.getJournal(course, page, limit);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchStudentGrades = createAsyncThunk(
  'journal/fetchStudentGrades',
  async ({ course, id_user }, { rejectWithValue }) => {
    try {
      return await journalService.getStudentGrades(course, id_user);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addGrade = createAsyncThunk(
  'journal/addGrade',
  async (data, { rejectWithValue }) => {
    try {
      return await journalService.addGrade(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateGrade = createAsyncThunk(
  'journal/updateGrade',
  async ({ course, id_journal, data }, { rejectWithValue }) => {
    try {
      return await journalService.updateGrade(course, id_journal, data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteGrade = createAsyncThunk(
  'journal/deleteGrade',
  async ({ course, id_journal }, { rejectWithValue }) => {
    try {
      await journalService.deleteGrade(course, id_journal);
      return { id_journal };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const journalSlice = createSlice({
    name: 'journal',
    initialState: {
      entries: [],
      studentGrades: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1
    },
    reducers: {
      clearError: (state) => {
        state.error = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchJournal.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchJournal.fulfilled, (state, action) => {
          state.loading = false;
          state.entries = action.payload.rows || [];
          state.currentPage = action.payload.currentPage || 1;
          state.totalPages = Math.ceil(action.payload.count / action.payload.limit) || 1;
        })
        .addCase(fetchJournal.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Ошибка загрузки журнала';
        })
      .addCase(fetchStudentGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.studentGrades = action.payload;
      })
      .addCase(fetchStudentGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.entries.unshift(action.payload);
      })
      .addCase(addGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.entries.findIndex(e => e.id_journal === action.payload.id_journal);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = state.entries.filter(e => e.id_journal !== action.payload.id_journal);
      })
      .addCase(deleteGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = journalSlice.actions;
export default journalSlice.reducer;