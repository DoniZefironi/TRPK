import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../service/AuthService';
import { API_URL } from '../../http';
import axios from 'axios';

// Асинхронные действия
export const login = createAsyncThunk('auth/login', async ({ email, password }, { dispatch }) => {
    const response = await AuthService.login(email, password);
    localStorage.setItem('token', response.accessToken);
    dispatch(setAuth(true));
    dispatch(setUser(response.user));
    return response;
});

// Регистрация с обработкой ошибок
export const registration = createAsyncThunk('auth/registration', async ({ email, password, username}, { dispatch, rejectWithValue }) => {
    try {
        const response = await AuthService.registration(email, password, username);
        localStorage.setItem('token', response.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(response.user));
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Неизвестная ошибка");
    }
});

// Логаут
export const logout = createAsyncThunk('auth/logout', async () => {
    await AuthService.logout();
    localStorage.removeItem('token');
});

// Проверка авторизации (обновление токена)
export const checkAuth = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/users/refresh`, {}, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Ошибка авторизации");
    }
});

// Слайс для работы с состоянием auth
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            id: "",
            email: "",
            username: "",
            role: "",
            permissions: "",
        },
        isAuth: false,
        isLoading: false,
        error: null,
    },
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload;
            localStorage.setItem('isAuth', action.payload);
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false;
                state.user = {
                    id: "",
                    email: "",
                    username: "",
                    role: "student",
                    permissions: "",
                };
                state.error = null;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(registration.rejected, (state, action) => {
                state.isAuth = false;
                state.user = {};
                state.error = action.payload;
            });
    }
});

export const { setAuth, setUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;