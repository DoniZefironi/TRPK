import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, refreshToken, logout } from '../../service/AuthService';

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    return await register(userData);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    return await login(userData);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const refreshUserToken = createAsyncThunk('auth/refreshUserToken', async (token, { rejectWithValue }) => {
  try {
    return await refreshToken(token);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (token, { rejectWithValue }) => {
  try {
    await logout(token);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Восстановление пользователя
    token: localStorage.getItem('token') || null, // Восстановление токена
    isLoading: false,
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('user'); // Удаляем данные пользователя из localStorage
      localStorage.removeItem('token'); // Удаляем токен
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Сохраняем пользователя
        localStorage.setItem('token', action.payload.token); // Сохраняем токен
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token); // Сохраняем accessToken
        localStorage.setItem('refreshToken', action.payload.refreshToken); // Добавьте эту строку
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('user'); // Удаляем данные пользователя
        localStorage.removeItem('token'); // Удаляем токен
      });
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
