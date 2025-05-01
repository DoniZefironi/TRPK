import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import materialsService from '../../service/MaterialService';

export const fetchMaterials = createAsyncThunk(
    'materials/fetchMaterials',
    async (params, thunkAPI) => {
        try {
            return await materialsService.fetchMaterials(params);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchMaterialById = createAsyncThunk(
    'materials/fetchMaterialById',
    async (id, thunkAPI) => {
        try {
            return await materialsService.fetchMaterialById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createMaterial = createAsyncThunk(
    'materials/createMaterial',
    async (data, thunkAPI) => {
        try {
            return await materialsService.createMaterial(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateMaterial = createAsyncThunk(
    'materials/updateMaterial',
    async ({ id, data }, thunkAPI) => {
        try {
            return await materialsService.updateMaterial(id, data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteMaterial = createAsyncThunk(
    'materials/deleteMaterial',
    async (id, thunkAPI) => {
        try {
            return await materialsService.deleteMaterial(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchMaterialTopics = createAsyncThunk(
    'materials/fetchMaterialTopics',
    async (_, thunkAPI) => {
        try {
            return await materialsService.fetchMaterialTopics();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const selectAllMaterials = (state) => state.materials.materials;

const materialsSlice = createSlice({
    name: 'materials',
    initialState: {
      materials: [],
      material: null,
      topics: [],
      loading: false,
      error: null,
      pagination: { totalPages: 1, total: 0, page: 1, limit: 10 }
  }
  ,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.loading = false;
                state.materials = action.payload.data;
            })
            .addCase(fetchMaterials.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchMaterialById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMaterialById.fulfilled, (state, action) => {
                state.loading = false;
                state.material = action.payload.data;
            })
            .addCase(fetchMaterialById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createMaterial.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMaterial.fulfilled, (state, action) => {
                state.loading = false;
                state.materials.push(action.payload.data);
            })
            .addCase(createMaterial.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateMaterial.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateMaterial.fulfilled, (state, action) => {
                state.loading = false;
                state.materials = state.materials.map((material) =>
                    material.id === action.payload.data.id ? action.payload.data : material
                );
            })
            .addCase(updateMaterial.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteMaterial.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteMaterial.fulfilled, (state, action) => {
                state.loading = false;
                state.materials = state.materials.filter(
                    (material) => material.id !== action.meta.arg
                );
            })
            .addCase(deleteMaterial.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchMaterialTopics.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMaterialTopics.fulfilled, (state, action) => {
                state.loading = false;
                state.topics = action.payload.data;
            })
            .addCase(fetchMaterialTopics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default materialsSlice.reducer;
