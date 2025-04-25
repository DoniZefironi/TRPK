import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ElectiveInformaticsService from "../../service/ElectiveInformaticsService";

const API_URL = 'http://localhost:2280/api/';

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const fetchElectives = createAsyncThunk(
    'electives/fetchElectives',
    async ({ page = 1, limit = 10, search = '' }, { rejectWithValue }) => {
        try {
            const response = await ElectiveInformaticsService.getAllElectives(page, limit, search);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchElectiveById = createAsyncThunk(
    'electives/fetchElectiveById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await ElectiveInformaticsService.getElectiveById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const createElective = createAsyncThunk(
    'electives/createElective',
    async ({ name, topic_elective, id_user }, { rejectWithValue }) => {
        try {
            const response = await ElectiveInformaticsService.createElective(name, topic_elective, id_user);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateElective = createAsyncThunk(
    'electives/updateElective',
    async ({ id, name, topic_elective }, { rejectWithValue }) => {
        try {
            const response = await ElectiveInformaticsService.updateElective(id, name, topic_elective);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteElective = createAsyncThunk(
    'electives/deleteElective',
    async (id, { rejectWithValue }) => {
        try {
            await ElectiveInformaticsService.deleteElective(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const addParticipant = createAsyncThunk(
    'electives/addParticipant',
    async ({ id, userId }, { rejectWithValue }) => {
        try {
            const response = await ElectiveInformaticsService.addParticipant(id, userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchUsers = createAsyncThunk(
    'electives/fetchUsers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('/user'); // Ваш endpoint для получения пользователей
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );

const initialState = {
    electives: [],
    users: [],
usersLoading: false,
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
        setPagination(state, action) {
            state.pagination = {
                ...state.pagination,
                ...action.payload
            };
        },
        fetchUsers: (state) => {
            state.usersLoading = true;
          },
          fetchUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.usersLoading = false;
          },
          fetchUsersFailure: (state) => {
            state.usersLoading = false;
          },
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

            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.usersLoading = false;
              })
              .addCase(fetchUsers.pending, (state) => {
                state.usersLoading = true;
              })
              .addCase(fetchUsers.rejected, (state) => {
                state.usersLoading = false;
              })
            
            // Получение одного факультатива
            .addCase(fetchElectiveById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchElectiveById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentElective = action.payload.data;
            })
            .addCase(fetchElectiveById.rejected, (state, action) => {
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
                const updatedIndex = state.electives.findIndex(e => e.id === action.payload.data.id);
                if (updatedIndex !== -1) {
                    state.electives[updatedIndex] = action.payload.data;
                }
                if (state.currentElective?.id === action.payload.data.id) {
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
                state.electives = state.electives.filter(e => e.id !== action.payload);
                if (state.currentElective?.id === action.payload) {
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
            .addCase(addParticipant.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addParticipant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCurrentElective, setPagination } = electiveInformaticsSlice.actions;
export default electiveInformaticsSlice.reducer;