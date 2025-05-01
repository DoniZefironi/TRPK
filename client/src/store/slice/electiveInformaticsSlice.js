import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import electiveService from '../../service/ElectiveInformaticsService';

// Асинхронные действия
export const fetchElectives = createAsyncThunk(
  'electives/fetchElectives',
  async ({ page = 1, limit = 10, search = '' }, { rejectWithValue }) => {
    try {
      return await electiveService.getAll({ page, limit, search });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchElective = createAsyncThunk(
  'electives/fetchElective',
  async (id, { rejectWithValue }) => {
    try {
      return await electiveService.getOne(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createElective = createAsyncThunk(
  'electives/createElective',
  async (data, { rejectWithValue }) => {
    try {
      return await electiveService.create(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateElective = createAsyncThunk(
  'electives/updateElective',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await electiveService.update(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteElective = createAsyncThunk(
  'electives/deleteElective',
  async (id, { rejectWithValue }) => {
    try {
      await electiveService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addParticipant = createAsyncThunk(
  'electives/addParticipant',
  async ({ electiveId, userId }, { rejectWithValue }) => {
    try {
      return await electiveService.addParticipant(electiveId, userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeParticipant = createAsyncThunk(
  'electives/removeParticipant',
  async ({ electiveId, userId }, { rejectWithValue }) => {
    try {
      return await electiveService.removeParticipant(electiveId, userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  electives: [],
  currentElective: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  }
};

const electiveInformaticsSlice = createSlice({
  name: 'electives',
  initialState,
  reducers: {
    clearCurrentElective(state) {
      state.currentElective = null;
    },
    resetElectivesState(state) {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder
      // Получение списка факультативов
      .addCase(fetchElectives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchElectives.fulfilled, (state, action) => {
        state.loading = false;
        state.electives = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchElectives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Получение одного факультатива
      .addCase(fetchElective.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchElective.fulfilled, (state, action) => {
        state.loading = false;
        state.currentElective = action.payload.data;
      })
      .addCase(fetchElective.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Создание факультатива
      .addCase(createElective.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createElective.fulfilled, (state, action) => {
        state.loading = false;
        state.electives.unshift(action.payload.data);
      })
      .addCase(createElective.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Обновление факультатива
      .addCase(updateElective.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateElective.fulfilled, (state, action) => {
        state.loading = false;
        const updatedIndex = state.electives.findIndex(
          e => e.id_elective === action.payload.data.id_elective
        );
        if (updatedIndex !== -1) {
          state.electives[updatedIndex] = action.payload.data;
        }
        if (state.currentElective?.id_elective === action.payload.data.id_elective) {
          state.currentElective = action.payload.data;
        }
      })
      .addCase(updateElective.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Удаление факультатива
      .addCase(deleteElective.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteElective.fulfilled, (state, action) => {
        state.loading = false;
        state.electives = state.electives.filter(
          e => e.id_elective !== action.payload
        );
        if (state.currentElective?.id_elective === action.payload) {
          state.currentElective = null;
        }
      })
      .addCase(deleteElective.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Добавление участника
      .addCase(addParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addParticipant.fulfilled, (state, action) => {
        state.loading = false;
        const updatedElective = action.payload.data;
        const index = state.electives.findIndex(
          e => e.id_elective === updatedElective.id_elective
        );
        if (index !== -1) {
          state.electives[index] = updatedElective;
        }
        if (state.currentElective?.id_elective === updatedElective.id_elective) {
          state.currentElective = updatedElective;
        }
      })
      .addCase(addParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Удаление участника
      .addCase(removeParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeParticipant.fulfilled, (state, action) => {
        state.loading = false;
        const updatedElective = action.payload.data;
        const index = state.electives.findIndex(
          e => e.id_elective === updatedElective.id_elective
        );
        if (index !== -1) {
          state.electives[index] = updatedElective;
        }
        if (state.currentElective?.id_elective === updatedElective.id_elective) {
          state.currentElective = updatedElective;
        }
      })
      .addCase(removeParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentElective, resetElectivesState } = electiveInformaticsSlice.actions;
export default electiveInformaticsSlice.reducer;