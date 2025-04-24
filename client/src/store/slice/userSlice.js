import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserById, updateUserById } from '../../service/UserService';

// 🔹 Получение пользователя по ID
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fetchUserById(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Обновление пользователя по ID
export const updateUserByIdAction = createAsyncThunk(
  'user/updateUserById',
  async ({ userId, userData, avatar }, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUserById({ userId, userData, avatar });
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    lastUpdated: null
  },
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Получение пользователя
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      
      // 🔹 Обновление пользователя
      .addCase(updateUserByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserByIdAction.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateUserByIdAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
