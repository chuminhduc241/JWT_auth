import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getUserStart: (state) => {
      state.users.isFetching = true;
    },
    getUserSuccsess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUserSuccsess: (state, action) => {
      state.users.isFetching = false;
      state.msg = action.payload;
    },
    deleteUsersFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.msg = action.payload;
    },
  },
});
export const {
  getUserStart,
  getUserSuccsess,
  getUsersFailed,
  deleteUserStart,
  deleteUserSuccsess,
  deleteUsersFailed,
} = userSlice.actions;
export default userSlice.reducer;
