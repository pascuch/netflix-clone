import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieDetailsReducer from "./movieDetailsSlice";
import genreDetailsReducer from "./genreDetailsSlice";
import personDetailsReducer from "./personDetailsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movieDetails: movieDetailsReducer,
    genreDetails: genreDetailsReducer,
    personDetails: personDetailsReducer,
  },
});
