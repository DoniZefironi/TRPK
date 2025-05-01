import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LessonService from '../../service/LectureService';

// Асинхронные действия
export const createLesson = createAsyncThunk(
    'lessons/create',
    async ({ course, lessonData }, { rejectWithValue }) => {
      try {
        // Проверка курса через сервис
        const response = await LessonService.create(course, lessonData);
        return response.data;
      } catch (error) {
        // Проверяем, если ошибка от сервиса валидации
        if (error.message.includes('Invalid course')) {
          return rejectWithValue({ message: error.message });
        }
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  

  export const fetchLessons = createAsyncThunk(
    'lessons/fetchAll',
    async (course, { rejectWithValue }) => {
      try {
        const data = await LessonService.getAll(course);
        console.log('Data before return:', data); // Добавьте этот лог
        return { course, data }; // Убедитесь, что возвращаете правильный объект
      } catch (error) {
        console.error('Fetch error:', error);
        return rejectWithValue(error.message);
      }
    }
  );

export const fetchLessonById = createAsyncThunk(
  'lessons/fetchById',
  async ({ course, id }, { rejectWithValue }) => {
    try {
      const response = await LessonService.getById(course, id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLesson = createAsyncThunk(
  'lessons/update',
  async ({ course, id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await LessonService.update(course, id, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  'lessons/delete',
  async ({ course, id }, { rejectWithValue }) => {
    try {
      await LessonService.delete(course, id);
      return { course, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const selectLessonsByCourse = (course) => (state) => {
    return state.lessons.byCourse?.[course] || [];
  };
  

// Слайс с правильным порядком обработчиков
export const lessonSlice = createSlice({
    name: 'lessons',
    initialState: {
      byCourse: {
        electric: [],
        iot: [],
        informatics: []
      },
      currentLesson: null,
      status: 'idle',
      error: null
    },
    reducers: {
      clearCurrentLesson: (state) => {
        state.currentLesson = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createLesson.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createLesson.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const course = action.meta.arg.course;
          state.byCourse[course].push(action.payload);
        })
      
      .addCase(fetchLessons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { course, data } = action.payload;
        
        // Явно создаем новый объект byCourse, если его нет
        if (!state.byCourse) {
          state.byCourse = {};
        }
        
        // Сохраняем данные, проверяя что они есть
        state.byCourse[course] = data || [];
        console.log('Saved to Redux:', course, state.byCourse[course]); // Добавьте этот лог
      })
      
      .addCase(fetchLessonById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentLesson = action.payload;
      })
      
      .addCase(updateLesson.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const course = action.meta.arg.course;
        const updatedLesson = action.payload;
        state.byCourse[course] = state.byCourse[course].map(lesson =>
          lesson.id_classes === updatedLesson.id_classes ? updatedLesson : lesson
        );
        if (state.currentLesson?.id_classes === updatedLesson.id_classes) {
          state.currentLesson = updatedLesson;
        }
      })
      
      .addCase(deleteLesson.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { course, id } = action.payload;
        state.byCourse[course] = state.byCourse[course].filter(
          lesson => lesson.id_classes !== id
        );
        if (state.currentLesson?.id_classes === id) {
          state.currentLesson = null;
        }
      })

      // Затем addMatcher для обработки ошибок
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload?.message || action.error.message || 'Неизвестная ошибка';
        }
      );
  }
});

export const { clearCurrentLesson } = lessonSlice.actions;
export default lessonSlice.reducer;