import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserInfo, updateUserInfo } from '../../service/UserService';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (userId, { rejectWithValue }) => {
  try {
    return await fetchUserInfo(userId);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData, avatar }, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUserInfo(userId, userData, avatar);
      return updatedUser; // Убедитесь, что этот процесс завершён
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unexpected error');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
