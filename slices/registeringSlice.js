import { createSlice } from "@reduxjs/toolkit";

let initialState = false;

console.log("im here too");

export const registerSlice = createSlice({
  name: "isRegistering",
  initialState,
  reducers: {
    setRegister: (state, action) => true,
    unSetRegister: (state) => false,
  },
});

// Action creators are generated for each case reducer function
export const { setRegister, unSetRegister } = registerSlice.actions;

export default registerSlice.reducer;
