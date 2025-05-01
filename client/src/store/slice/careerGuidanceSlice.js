import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import careerGuidanceService from '../../service/CareerGuidanceService';

// Async thunks
export const fetchCareerGuidances = createAsyncThunk(
  'careerGuidance/fetchAll',
  async ({ page = 1, limit = 10, dateFrom, dateTo, search }, { rejectWithValue }) => {
    try {
      return await careerGuidanceService.getAll(page, limit, dateFrom, dateTo, search);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCareerGuidanceById = createAsyncThunk(
  'careerGuidance/fetchById',
  async (id_guidance, { rejectWithValue }) => {
    try {
      return await careerGuidanceService.getById(id_guidance);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCareerGuidance = createAsyncThunk(
  'careerGuidance/create',
  async (data, { rejectWithValue }) => {
    try {
      return await careerGuidanceService.create(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCareerGuidance = createAsyncThunk(
  'careerGuidance/update',
  async ({ id_guidance, data }, { rejectWithValue }) => {
    try {
      return await careerGuidanceService.update(id_guidance, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCareerGuidance = createAsyncThunk(
  'careerGuidance/delete',
  async (id_guidance, { rejectWithValue }) => {
    try {
      await careerGuidanceService.delete(id_guidance);
      return id_guidance;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchByDate = createAsyncThunk(
  'careerGuidance/fetchByDate',
  async (date, { rejectWithValue }) => {
    try {
      return await careerGuidanceService.getByDate(date);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
};

const careerGuidanceSlice = createSlice({
  name: 'careerGuidance',
  initialState,
  reducers: {
    clearCurrentItem(state) {
      state.currentItem = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchCareerGuidances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareerGuidances.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCareerGuidances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch by ID
      .addCase(fetchCareerGuidanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareerGuidanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchCareerGuidanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create
      .addCase(createCareerGuidance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCareerGuidance.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createCareerGuidance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update
      .addCase(updateCareerGuidance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCareerGuidance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id_guidance === action.payload.id_guidance);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentItem && state.currentItem.id_guidance === action.payload.id_guidance) {
          state.currentItem = action.payload;
        }
      })
      .addCase(updateCareerGuidance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete
      .addCase(deleteCareerGuidance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCareerGuidance.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id_guidance !== action.payload);
      })
      .addCase(deleteCareerGuidance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch by date
      .addCase(fetchByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentItem, resetError } = careerGuidanceSlice.actions;
export default careerGuidanceSlice.reducer;