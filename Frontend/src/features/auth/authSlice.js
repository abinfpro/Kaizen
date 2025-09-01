import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:5000/login", formData, {
      withCredentials: true,
    });
    return res.data; // { token, user }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || "Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthed: false, user: null, loading: false },
  reducers: {
    logout: (state) => {
      state.isAuthed = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthed = true;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token); // store token
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthed = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
