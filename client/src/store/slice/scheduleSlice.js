import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import scheduleService from '../../service/ScheduleService';

export const createScheduleItem = createAsyncThunk(
    'schedule/create',
    async ({ course, data }, thunkAPI) => {
        try {
            return await scheduleService.createScheduleItem(course, data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchSchedule = createAsyncThunk(
    'schedule/fetchAll',
    async ({ course, params }, thunkAPI) => {
        try {
            return await scheduleService.getSchedule(course, params);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchGroupSchedule = createAsyncThunk(
    'schedule/fetchGroup',
    async ({ course, groupId, params }, thunkAPI) => {
        try {
            return await scheduleService.getGroupSchedule(course, groupId, params);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchScheduleItem = createAsyncThunk(
    'schedule/fetchOne',
    async ({ course, id }, thunkAPI) => {
        try {
            return await scheduleService.getScheduleItem(course, id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateScheduleItem = createAsyncThunk(
    'schedule/update',
    async ({ course, id, data }, thunkAPI) => {
        try {
            return await scheduleService.updateScheduleItem(course, id, data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteScheduleItem = createAsyncThunk(
    'schedule/delete',
    async ({ course, id }, thunkAPI) => {
        try {
            await scheduleService.deleteScheduleItem(course, id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchScheduleByDate = createAsyncThunk(
    'schedule/fetchByDate',
    async ({ course, date, groupId }, thunkAPI) => {
        try {
            return await scheduleService.getScheduleByDate(course, date, groupId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchLectures = createAsyncThunk(
    'schedule/fetchLectures',
    async (course, { rejectWithValue }) => {
      try {
        const response = await scheduleService.getLectures(course);
        return { 
          data: response.data || [],
          course
        };
      } catch (error) {
        return rejectWithValue({
          message: 'Ошибка загрузки лекций',
          course,
          error: error.message
        });
      }
    }
  );
  
  export const fetchGroups = createAsyncThunk(
    'schedule/fetchGroups',
    async (course, { rejectWithValue }) => {
      try {
        const response = await scheduleService.getGroups(course);
        return { 
          data: response.data || [],
          course
        };
      } catch (error) {
        return rejectWithValue({
          message: 'Ошибка загрузки групп',
          course,
          error: error.message
        });
      }
    }
  );

const initialState = {
    items: [],
    currentItem: null,
    lectures: [],
    groups: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1
    }
  };
  
  const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
      clearCurrentItem(state) {
        state.currentItem = null;
      },
      setPagination(state, action) {
        state.pagination = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createScheduleItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(createScheduleItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload.data);
            })
            .addCase(createScheduleItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch all
            .addCase(fetchSchedule.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.pagination = action.payload.pagination || initialState.pagination;
            })
            .addCase(fetchSchedule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch group schedule
            .addCase(fetchGroupSchedule.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGroupSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.pagination = action.payload.pagination || initialState.pagination;
            })
            .addCase(fetchGroupSchedule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch single
            .addCase(fetchScheduleItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchScheduleItem.fulfilled, (state, action) => {
                state.loading = false;
                state.currentItem = action.payload.data;
            })
            .addCase(fetchScheduleItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update
            .addCase(updateScheduleItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateScheduleItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.map(item => 
                    item.id_schedule === action.payload.data.id_schedule ? action.payload.data : item
                );
                state.currentItem = action.payload.data;
            })
            .addCase(updateScheduleItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Delete
            .addCase(deleteScheduleItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteScheduleItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id_schedule !== action.payload);
            })
            .addCase(deleteScheduleItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch by date
            .addCase(fetchScheduleByDate.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchScheduleByDate.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(fetchScheduleByDate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch lectures
            .addCase(fetchLectures.pending, (state) => {
                state.loading = true;
              })
              .addCase(fetchLectures.fulfilled, (state, action) => {
                state.loading = false;
                // Обновляем только если курс совпадает
                if (state.currentCourse === action.payload.course) {
                  state.lectures = action.payload.data;
                }
              })
              .addCase(fetchLectures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.lectures = [];
              })
            
            // Fetch groups
            .addCase(fetchGroups.pending, (state) => {
                state.loading = true;
              })
              .addCase(fetchGroups.fulfilled, (state, action) => {
                state.loading = false;
                // Обновляем только если курс совпадает
                if (state.currentCourse === action.payload.course) {
                  state.groups = action.payload.data;
                }
              })
              .addCase(fetchGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.groups = [];
              });
    }
});

export const { clearCurrentItem, setPagination } = scheduleSlice.actions;
export default scheduleSlice.reducer;