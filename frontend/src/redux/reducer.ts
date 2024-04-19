import { modalReducer } from "./modal/modalSlice";
import { boardsReducer } from "./boards/boardsSlice";
import { logsReducer } from "./action-logs/logsSlice";

export const reducer = {
  desk: boardsReducer,
  modal: modalReducer,
  log: logsReducer,
};
