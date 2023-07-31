import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import membersService from "./membersService";
import { toast } from "react-toastify";

const initialState = {
  members: [],
  expirationDate: "",
  sessionCounters: {},
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
      toast.error(err.message);
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

//Get Expiration date by phone number
export const getExpirationDateByPhone = createAsyncThunk(
  "member/getExpByPhone",
  async (phoneNb, thunkApi) => {
    try {
      return await membersService.getExpirationDateByPhone(phoneNb);
    } catch (err) {
      console.log(err);
      const message = err.response.data.msg;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const incrementSessionCounter = createAsyncThunk(
  "members/incrementSessionCounter",
  async (memberId, thunkApi) => {
    try {
      // You can add server/API calls here if required
      thunkApi.dispatch(membersSlice.actions.incrementSession(memberId));
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

export const decrementSessionCounter = createAsyncThunk(
  "members/decrementSessionCounter",
  async (memberId, thunkApi) => {
    try {
      // You can add server/API calls here if required
      thunkApi.dispatch(membersSlice.actions.decrementSession(memberId));
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
    incrementSession: (state, action) => {
      const { memberId } = action.payload;
      state.sessionCounters = {
        ...state.sessionCounters,
        [memberId]: (state.sessionCounters[memberId] || 0) + 1,
      };
      localStorage.setItem(
        "sessionCounters",
        JSON.stringify(state.sessionCounters)
      );
    },
    decrementSession: (state, action) => {
      const { memberId } = action.payload;
      state.sessionCounters = {
        ...state.sessionCounters,
        [memberId]: Math.max((state.sessionCounters[memberId] || 0) - 1, 0),
      };
      localStorage.setItem(
        "sessionCounters",
        JSON.stringify(state.sessionCounters)
      );
    },
    setSessionCounters: (state, action) => {
      state.sessionCounters = action.payload;
    },
    removeSessionCounter: (state, action) => {
      const { memberId } = action.payload;
      delete state.sessionCounters[memberId];
    },
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
        const memberIdToDelete = action.payload.id;

        state.members = state.members.filter(
          (member) => member._id !== action.payload.id
        );
        const updatedSessionCounters = { ...state.sessionCounters };
        delete updatedSessionCounters[memberIdToDelete];
        state.sessionCounters = updatedSessionCounters;
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
      })
      .addCase(getExpirationDateByPhone.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpirationDateByPhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expirationDate = action.payload.expirationDate;
      })
      .addCase(getExpirationDateByPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.expirationDate = null; // Reset the expiration date on rejected API call

      });
  },
});

export const { reset } = membersSlice.actions;

export default membersSlice.reducer;
