import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createMaterial, fetchAllMaterials, fetchMaterialById, deleteMaterial, updateMaterialById } from '../../service/MaterialService';

// Асинхронные экшены
export const getAllMaterials = createAsyncThunk(
  'materials/getAllMaterials',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllMaterials();
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения материалов');
    }
  }
);

export const getMaterialById = createAsyncThunk(
  'materials/getMaterialById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchMaterialById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка получения материала');
    }
  }
);

export const addMaterial = createAsyncThunk(
    'materials/addMaterial',
    async (materialData, { rejectWithValue }) => {
      try {
        return await createMaterial(materialData);
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Ошибка создания материала');
      }
    }
  );
  
  export const updateMaterial = createAsyncThunk(
    'materials/updateMaterial',
    async (materialData, { rejectWithValue }) => {
      try {
        const { id_material, ...data } = materialData;
        return await updateMaterialById(id_material, data); 
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Ошибка обновления материала');
      }
    }
  );

export const removeMaterial = createAsyncThunk(
  'materials/removeMaterial',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteMaterial(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Ошибка удаления материала');
    }
  }
);

// Слайс
const materialSlice = createSlice({
  name: 'materials',
  initialState: {
    materials: [],
    material: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearMaterialState: (state) => {
      state.material = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение всех материалов
      .addCase(getAllMaterials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllMaterials.fulfilled, (state, action) => {
        state.materials = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllMaterials.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // Получение материала по ID
      .addCase(getMaterialById.fulfilled, (state, action) => {
        state.material = action.payload;
      })
      // Добавление материала
      .addCase(addMaterial.fulfilled, (state, action) => {
        state.materials.push(action.payload);
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        const index = state.materials.findIndex(
          (item) => item.id_material === action.payload.id_material
        );
        if (index !== -1) {
          state.materials[index] = action.payload;
        }
      })
      // Удаление материала
      .addCase(removeMaterial.fulfilled, (state, action) => {
        state.materials = state.materials.filter((item) => item.id_material !== action.meta.arg);
      });
  },
});

export const { clearMaterialState } = materialSlice.actions;
export default materialSlice.reducer;
