import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addSection, fetchSections } from '../../service/SectionService';

// Асинхронный экшен для добавления секции
export const createSection = createAsyncThunk(
  'sections/createSection',
  async (sectionData, { rejectWithValue }) => {
    try {
      return await addSection(sectionData);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка добавления секции');
    }
  }
);

// Асинхронный экшен для получения секций
export const getSections = createAsyncThunk(
  'sections/getSections',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSections();
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения секций');
    }
  }
);

// Слайс
const sectionSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.sections.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createSection.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getSections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSections.fulfilled, (state, action) => {
        state.sections = action.payload.sections;
        state.isLoading = false;
      })
      .addCase(getSections.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default sectionSlice.reducer;
