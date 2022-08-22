import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  details: null,
  movieCast: null,
  showDetails: false,
  showPlayer: false,
  positionY: 0,
  status: "idle", // 'idle' || 'loading' || 'succeded || 'failed'
  error: null,
};

export const fetchPersonDetails = createAsyncThunk(
  "personDetails/fetchPersonDetails",
  async (id) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchPersonMovieCast = createAsyncThunk(
  "personMovieCast/fetchPersonMovieCast",
  async (id) => {
    try {
      const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_cast=${id}`
        );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);


const personDetailsSlice = createSlice({
  name: "personDetails",
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
      .addCase(fetchPersonDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPersonDetails.fulfilled, (state, action) => {
        state.status = "succeded";
        state.details = action.payload;
        state.showDetails = true;
      })
      .addCase(fetchPersonDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPersonMovieCast.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPersonMovieCast.fulfilled, (state, action) => {
        state.status = "succeded";
        state.movieCast = action.payload;
      })
      .addCase(fetchPersonMovieCast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

  },
});

export const { cleanDetails, changePositionY, changePlayer } =
  personDetailsSlice.actions;

export const selectPersonDetails = (state) => state.personDetails.details;
export const selectPersonMovieCast = (state) => state.personDetails.movieCast;
export const selectShowDetails = (state) => state.personDetails.showDetails;
export const selectPositionY = (state) => state.personDetails.positionY;
export const selectShowPlayer = (state) => state.personDetails.showPlayer;
export const getPersonDetailsStatus = (state) => state.personDetails.status;
export const getPersonDetailsError = (state) => state.personDetails.error;

export default personDetailsSlice.reducer;
