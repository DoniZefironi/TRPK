import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserById, updateUserById,fetchAllUsers, changeUserRole  } from '../../service/UserService';

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

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllUsers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Смена роли пользователя
export const changeUserRoleAction = createAsyncThunk(
  'user/changeUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      return await changeUserRole({ userId, role });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
    loading: false,
    error: null,
    lastUpdated: null
  },
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.users = [];
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

            // 🔹 Получение всех пользователей
            .addCase(getAllUsers.pending, (state) => { state.loading = true; })
            .addCase(getAllUsers.fulfilled, (state, action) => {
              state.users = action.payload;
              state.loading = false;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
              state.error = action.payload;
              state.loading = false;
            })

                  // 🔹 Смена роли пользователя
      .addCase(changeUserRoleAction.pending, (state) => { state.loading = true; })
      .addCase(changeUserRoleAction.fulfilled, (state, action) => {
        state.users = state.users.map(user =>
          user.id === action.payload.id ? { ...user, permissions: action.payload.permissions } : user
        );
        state.loading = false;
      })
      .addCase(changeUserRoleAction.rejected, (state, action) => {
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
