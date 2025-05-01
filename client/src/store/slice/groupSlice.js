import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import groupService from '../../service/GroupService';

// Асинхронные действия
export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async ({ course, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const data = await groupService.getGroups(course, page, limit);
      // Добавляем курс к каждой группе
      const groupsWithCourse = data.rows.map(group => ({
        ...group,
        course // Добавляем поле course
      }));
      return { 
        course, 
        groups: groupsWithCourse, 
        total: data.count,
        page,
        limit
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchGroupDetails = createAsyncThunk(
  'groups/fetchGroupDetails',
  async ({ course, id }, { rejectWithValue }) => {
    try {
      const group = await groupService.getGroupDetails(course, id);
      const members = await groupService.getGroupMembers(course, id);
      return { group, members };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const createdGroup = await groupService.createGroup(groupData);
      return createdGroup;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async ({ course, id, groupData }, { rejectWithValue }) => {
    try {
      const updatedGroup = await groupService.updateGroup(course, id, groupData);
      return updatedGroup;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async ({ course, id }, { rejectWithValue }) => {
    try {
      await groupService.deleteGroup(course, id);
      return { course, id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addMember = createAsyncThunk(
  'groups/addMember',
  async ({ course, id, memberData }, { rejectWithValue }) => {
    try {
      const member = await groupService.addMember(course, id, memberData);
      return member;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchGroupMembers = createAsyncThunk(
  'groups/fetchGroupMembers',
  async ({ course }, { rejectWithValue }) => {
    try {
      const members = await groupService.getGroupMembers(course);
      return { course, members };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSpecificGroupMembers = createAsyncThunk(
  'groups/fetchSpecificGroupMembers',
  async ({ course, groupId }, { rejectWithValue }) => {
    try {
      const members = await groupService.getSpecificGroupMembers(course, groupId);
      return { course, groupId, members };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateMember = createAsyncThunk(
  'groups/updateMember',
  async ({ course, id, userId, memberData }, { rejectWithValue }) => {
    try {
      const member = await groupService.updateMember(course, id, userId, memberData);
      return { course, id, userId, member };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeMember = createAsyncThunk(
  'groups/removeMember',
  async ({ course, id, userId }, { rejectWithValue }) => {
    try {
      await groupService.removeMember(course, id, userId);
      return { course, id, userId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Начальное состояние
const initialState = {
  courses: ['electric', 'iot', 'informatics'],
  currentCourse: null,
  groups: [],
  currentGroup: null,
  members: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
};

// Создание слайса
const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    resetGroupState: (state) => {
      state.currentGroup = null;
      state.members = [];
    },
    resetError: (state) => {
      state.error = null;
    },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Обработчики для конкретных действий (addCase)
    builder
    .addCase(fetchGroups.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = action.payload.groups;
      state.pagination = {
        page: action.payload.page,
        limit: action.payload.limit,
        total: action.payload.total
      };
    })
      .addCase(fetchGroupDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGroup = action.payload.group;
        state.members = action.payload.members;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.unshift(action.payload);
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.groups.findIndex(g => g.id_group === action.payload.id_group);
        if (index !== -1) state.groups[index] = action.payload;
        if (state.currentGroup?.id_group === action.payload.id_group) {
          state.currentGroup = action.payload;
        }
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter(g => g.id_group !== action.payload.id);
        if (state.currentGroup?.id_group === action.payload.id) {
          state.currentGroup = null;
        }
      })
      builder.addCase(fetchGroupMembers.fulfilled, (state, action) => {
        state.members = action.payload.members;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members.push(action.payload);
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.members.findIndex(m => 
          m.id_user === action.payload.userId && 
          m.id_group === action.payload.id
        );
        if (index !== -1) state.members[index] = action.payload.member;
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = state.members.filter(m => m.id_user !== action.payload.userId);
      })
      .addCase(fetchSpecificGroupMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload.members;
      });

    // Общие обработчики (addMatcher) - должны быть после всех addCase
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  }
});

// Экспорт действий и редьюсера
export const { 
  setCurrentCourse, 
  resetGroupState, 
  resetError,
  setCurrentGroup,    // Добавляем этот экспорт
  setMembers          // И этот
} = groupSlice.actions;

export default groupSlice.reducer;