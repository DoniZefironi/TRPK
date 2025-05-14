import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:2280/api/projects';

// ========================
// Thunks
// ========================

// Создание проекта
export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка при создании проекта');
    }
  }
);

// Получение всех проектов по курсу
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (course, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?course=${course}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка при загрузке проектов');
    }
  }
);

// Получение проекта по ID
export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async ({ id, course }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}?course=${course}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка при получении проекта');
    }
  }
);

// Обновление проекта
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка при обновлении проекта');
    }
  }
);

// Удаление проекта
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async ({ id, course }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}?course=${course}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка при удалении проекта');
    }
  }
);

// ========================
// Slice
// ========================

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    selectedProject: null,
    loading: false,
    error: null
  },
  reducers: {
    clearSelectedProject(state) {
      state.selectedProject = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      });
  }
});

export const { clearSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
