import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  genres: null,
  details: null,
  showDetails: false,
  showPlayer: false,
  positionY: 0,
  status: "idle", // 'idle' || 'loading' || 'succeded || 'failed'
  error: null,
};

export const fetchGenres = createAsyncThunk(
  "genreDetails/fetchGenres",
  async () => {
    try {
      const response = await axios.get(
        `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data.genres;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchGenreDetails = createAsyncThunk(
  "genreDetails/fetchGenreDetails",
  async (id) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&vote_average.gte=7&page=2&with_genres=${id}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const genreDetailsSlice = createSlice({
  name: "genreDetails",
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
      .addCase(fetchGenres.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeded";
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchGenreDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGenreDetails.fulfilled, (state, action) => {
        state.status = "succeded";
        state.details = action.payload;
        state.showDetails = true;
      })
      .addCase(fetchGenreDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { cleanDetails, changePositionY, changePlayer } =
  genreDetailsSlice.actions;

export const selectGenres = (state) => state.genreDetails.genres;
export const selectGenreDetails = (state) => state.genreDetails.details;
export const selectShowDetails = (state) => state.genreDetails.showDetails;
export const selectPositionY = (state) => state.genreDetails.positionY;
export const selectShowPlayer = (state) => state.genreDetails.showPlayer;
export const getGenreDetailsStatus = (state) => state.genreDetails.status;
export const getGenreDetailsError = (state) => state.genreDetails.error;

export default genreDetailsSlice.reducer;
