import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieDetailsReducer from "./movieDetailsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movieDetails: movieDetailsReducer
  },
});
