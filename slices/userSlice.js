import { createSlice } from "@reduxjs/toolkit";

let initialState = null;

console.log("im here");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      return action.payload;
    },
    logOutUser: (state) => null,
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
