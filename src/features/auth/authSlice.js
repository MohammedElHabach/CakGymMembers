import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get admin from localStorage
const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login admin
export const login = createAsyncThunk("auth/login", async (admin, thunkAPI) => {
  //admin data passes from the login form
  try {
    return await authService.login(admin);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

//Logout admin
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.admin = null;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
