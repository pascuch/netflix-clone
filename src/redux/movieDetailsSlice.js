import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  details: null,
  showDetails: false,
  showPlayer: false,
  positionY: 0,
  status: "idle", // 'idle' || 'loading' || 'succeded || 'failed'
  error: null,
};

export const fetchMovieDetails = createAsyncThunk(
  "movieDetails/fetchMovieDetails",
  async (id) => {
    try {
      const response = await axios.get(
        `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,images,credits`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {
    cleanDetails: (state, action) => {
      state.user = null;
      state.showDetails = false;
    },
    changePositionY: (state, action) => {
      state.positionY = action.payload;
      state.showDetails = true;
    },
    changePlayer: (state, action) => {
      state.showPlayer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovieDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = "succeded";
        state.details = action.payload
        state.showDetails = true;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { cleanDetails, changePositionY, changePlayer } =
  movieDetailsSlice.actions;

export const selectMovieDetails = (state) => state.movieDetails.details;
export const selectShowDetails = (state) => state.movieDetails.showDetails;
export const selectPositionY = (state) => state.movieDetails.positionY;
export const selectShowPlayer = (state) => state.movieDetails.showPlayer;
export const getMovieDetailsStatus = (state) => state.movieDetails.status;
export const getMovieDetailsError = (state) => state.movieDetails.error;

export default movieDetailsSlice.reducer;
