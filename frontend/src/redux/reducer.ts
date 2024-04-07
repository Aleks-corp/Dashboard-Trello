import { modalReducer } from "./modal/modalSlice";
import { boardsReducer } from "./boards/boardsSlice";

export const reducer = {
  desk: boardsReducer,
  modal: modalReducer,
};
