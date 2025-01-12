import { configureStore } from "@reduxjs/toolkit";

//reducers
import userSlice from "@/slices/userSlice";
import regusterSlice from "@/slices/registeringSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    isRegistering: regusterSlice,
  },
});
