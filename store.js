import { configureStore } from "@reduxjs/toolkit";

//reducers
import userSlice from "@/slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
