import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import JournalService from '../../service/JournalService';

const initialState = {
  grades: [],
  lectureGrades: null,
  studentGrades: [],
  currentGrade: null,
  pagination: {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 10,
  },
  loading: false,
  error: null,
};

// Асинхронные действия
export const fetchGrades = createAsyncThunk(
  'journal/fetchGrades',
  async ({ course, params = {} }, { rejectWithValue }) => {
    try {
      return await JournalService.getAllGrades(course, params);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchGradeById = createAsyncThunk(
  'journal/fetchGradeById',
  async ({ course, id }, { rejectWithValue }) => {
    try {
      return await JournalService.getGradeById(course, id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchStudentGrades = createAsyncThunk(
  'journal/fetchStudentGrades',
  async ({ course, userId }, { rejectWithValue }) => {
    try {
      return await JournalService.getStudentGrades(course, userId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchLectureGrades = createAsyncThunk(
  'journal/fetchLectureGrades',
  async ({ course, lectureId }, { rejectWithValue }) => {
    try {
      return await JournalService.getLectureGrades(course, lectureId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addNewGrade = createAsyncThunk(
  'journal/addNewGrade',
  async ({ course, data }, { rejectWithValue }) => {
    try {
      return await JournalService.addGrade(course, data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateExistingGrade = createAsyncThunk(
  'journal/updateExistingGrade',
  async ({ course, id, data }, { rejectWithValue }) => {
    try {
      return await JournalService.updateGrade(course, id, data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteExistingGrade = createAsyncThunk(
  'journal/deleteExistingGrade',
  async ({ course, id }, { rejectWithValue }) => {
    try {
      await JournalService.deleteGrade(course, id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    clearCurrentGrade(state) {
      state.currentGrade = null;
    },
    clearLectureGrades(state) {
      state.lectureGrades = null;
    },
    clearStudentGrades(state) {
      state.studentGrades = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchGrades
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Обработка fetchGradeById
      .addCase(fetchGradeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGradeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGrade = action.payload;
      })
      .addCase(fetchGradeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Обработка fetchStudentGrades
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
      
      // Обработка fetchLectureGrades
      .addCase(fetchLectureGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLectureGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.lectureGrades = action.payload;
      })
      .addCase(fetchLectureGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Обработка addNewGrade
      .addCase(addNewGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grades.unshift(action.payload);
      })
      .addCase(addNewGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Обработка updateExistingGrade
      .addCase(updateExistingGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingGrade.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.grades.findIndex(grade => grade.id === action.payload.id);
        if (index !== -1) {
          state.grades[index] = action.payload;
        }
        if (state.currentGrade?.id === action.payload.id) {
          state.currentGrade = action.payload;
        }
      })
      .addCase(updateExistingGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Обработка deleteExistingGrade
      .addCase(deleteExistingGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = state.grades.filter(grade => grade.id !== action.payload);
      })
      .addCase(deleteExistingGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentGrade, clearLectureGrades, clearStudentGrades } = journalSlice.actions;
export default journalSlice.reducer;