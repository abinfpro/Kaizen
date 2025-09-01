import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Async thunks
export const fetchTreatments = createAsyncThunk("treatments/fetch", async () => {
  return await api.getSelectedTreatments();
});

export const addTreatment = createAsyncThunk("treatments/add", async (treatment) => {
  return await api.postTreatment(treatment);
});

export const removeTreatment = createAsyncThunk("treatments/remove", async (id) => {
  return await api.deleteTreatment(id);
});

const treatmentsSlice = createSlice({
  name: "treatments",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearTreatments: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTreatments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload ?? [];
      })
      .addCase(fetchTreatments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTreatment.fulfilled, (state, action) => {
        const exists = state.items.some((t) => t.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      .addCase(removeTreatment.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload.id);
      });
  },
});

export const { clearTreatments } = treatmentsSlice.actions;
export default treatmentsSlice.reducer;
