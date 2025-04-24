import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import groupService from '../../service/GroupService';

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async ({ course, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      return await groupService.getGroups(course, page, limit);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGroupDetails = createAsyncThunk(
  'groups/fetchGroupDetails',
  async ({ course, id }, { rejectWithValue }) => {
    try {
      return await groupService.getGroupDetails(course, id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      return await groupService.createGroup(groupData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async ({ course, id, groupData }, { rejectWithValue }) => {
    try {
      return await groupService.updateGroup(course, id, groupData);
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMember = createAsyncThunk(
  'groups/addMember',
  async ({ course, id, memberData }, { rejectWithValue }) => {
    try {
      return await groupService.addMember(course, id, memberData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGroupMembers = createAsyncThunk(
  'groups/fetchGroupMembers',
  async ({ course, id }, { rejectWithValue }) => {
    try {
      return await groupService.getGroupMembers(course, id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMember = createAsyncThunk(
  'groups/updateMember',
  async ({ course, id, userId, memberData }, { rejectWithValue }) => {
    try {
      return await groupService.updateMember(course, id, userId, memberData);
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);

const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    courses: ['electric', 'iot', 'informatics'],
    currentCourse: null,
    groups: [],
    groupDetails: null,
    members: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0
    }
  },
  reducers: {
    setCurrentCourse: (state, action) => {
        state.currentCourse = action.payload.toLowerCase();
    },
    clearGroupDetails: (state) => {
      state.groupDetails = null;
    },
    clearMembers: (state) => {
      state.members = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Groups
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.rows;
        state.pagination.total = action.payload.count;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Group Details
      .addCase(fetchGroupDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.groupDetails = action.payload;
      })
      .addCase(fetchGroupDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Group
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.unshift(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Group
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.groups.findIndex(g => g.id_group === action.payload.id_group);
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
        if (state.groupDetails?.id_group === action.payload.id_group) {
          state.groupDetails = action.payload;
        }
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Group
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter(g => g.id_group !== action.payload.id);
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Group Members
      .addCase(fetchGroupMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchGroupMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Member
      .addCase(addMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members.push(action.payload);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Member
      .addCase(updateMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.members.findIndex(m => 
          m.id_user === action.payload.id_user && m.id_group === action.payload.id_group
        );
        if (index !== -1) {
          state.members[index] = action.payload;
        }
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Remove Member
      .addCase(removeMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = state.members.filter(m => 
          !(m.id_user === action.payload.userId && m.id_group === action.payload.id)
        );
      })
      .addCase(removeMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentCourse, clearGroupDetails, clearMembers } = groupSlice.actions;
export default groupSlice.reducer;