import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import membersService from "./membersService";

const initialState = {
  members: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Members
export const getMembers = createAsyncThunk(
  "members/getAll",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.admin.token;
      return await membersService.getMembers(token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//Create new member
export const addMember = createAsyncThunk(
  "members/add",
  async (memberData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.admin.token;
      return await membersService.addMember(memberData, token);
    } catch (err) {
      console.log(err);
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//Delete member
export const deleteMember = createAsyncThunk(
  "member/delete",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.admin.token;
      return await membersService.deleteMember(id, token);
    } catch (err) {
      console.log(err);
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//Edit member
export const editMember = createAsyncThunk(
  "member/edit",
  async ({ id, editedMemberData }, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.admin.token;
      return await membersService.editMember(id, editedMemberData, token);
    } catch (err) {
      console.log(err);
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members.push(action.payload);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = state.members.filter(
          (member) => member._id !== action.payload.id
        );
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const editedMember = action.payload;
        const index = state.members.findIndex(
          (member) => member._id === editedMember._id
        );
        if (index !== -1) {
          state.members[index] = editedMember;
        }
      })
      .addCase(editMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = membersSlice.actions;

export default membersSlice.reducer;
