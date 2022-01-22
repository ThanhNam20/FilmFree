import { createSlice } from "@reduxjs/toolkit";

const initState: any = {
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    }
  },
  extraReducers: {}
})

const { reducer, actions } = userSlice;
export const { setUserInfo } = actions;
export const UserReducer = reducer;