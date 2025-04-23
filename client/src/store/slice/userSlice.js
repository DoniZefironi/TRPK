import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile, updateUserProfile } from '../../service/UserService';

// Асинхронное действие для получения профиля пользователя
export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (userId, { rejectWithValue, getState }) => {
    try {
      console.log('[userSlice] Запрос профиля для:', userId);
      const response = await fetchUserProfile(userId);
      
      if (!response.id_user) {
        console.error('[userSlice] Неверный формат данных профиля');
        throw new Error('Неверный формат данных профиля');
      }
      
      return response;
    } catch (error) {
      console.error('[userSlice] Ошибка:', error.message);
      return rejectWithValue({
        message: error.message,
        status: error.response?.status
      });
    }
  }
);

// Асинхронное действие для обновления профиля пользователя
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, userData, avatar }, { rejectWithValue }) => {
    try {
      const response = await updateUserProfile(userId, userData, avatar);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    isLoading: false,
    error: null,
    lastUpdated: null
  },
  reducers: {
    clearUserState: (state) => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка getUserProfile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      
      // Обработка updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;