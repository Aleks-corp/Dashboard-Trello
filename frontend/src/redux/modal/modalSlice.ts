import { createSlice } from "@reduxjs/toolkit";
import { ModalState } from "../../types/state.types";

const initialState = {
  isOpen: false,
  error: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state: ModalState) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
