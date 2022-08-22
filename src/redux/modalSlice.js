import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: [],
  showModal: false,
  positionY: 0,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.info = state.info.unshift(action.payload);
      state.showModal = true;
    },
    cleanInfo: (state, action) => {
      state.info = state.info.shift();
      state.showModal = false;
    },
    changePositionY: (state, action) => {
      state.positionY = action.payload;
    },
  },
});

export const {addInfo, cleanInfo, changePositionY} = modalSlice.actions;

export const selectModalInfo = (state) => state.modal.info;

export default modalSlice.reducer;
