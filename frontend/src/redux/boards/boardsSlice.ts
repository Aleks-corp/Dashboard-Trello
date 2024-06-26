import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardsState } from "../../types/state.types";
import {
  fetchBoards,
  addBoard,
  updateBoard,
  deleteBoard,
  fetchBoardById,
} from "./board.thunk";
import {
  handleFulfilledAddList,
  handleFulfilledDeleteList,
  handleFulfilledUpdateList,
} from "./listSlice";
import { addList, updateList, deleteList } from "./list.thunk";
import {
  handleFulfilledAddBoard,
  handleFulfilledBoard,
  handleFulfilledBoardById,
  handleFulfilledDeleteBoard,
  handleFulfilledUpdateBoard,
} from "./boardSlice";
import { addTask, deleteTask, fetchTaskById, updateTask } from "./task.thunk";
import {
  handleFulfilledAddTasks,
  handleFulfilledDeleteTasks,
  handleFulfilledTaskById,
  handleFulfilledUpdateTasks,
} from "./taskSlice";

const initialState: BoardsState = {
  boards: [],
  selectedBoard: null,
  task: null,
  isLoading: false,
  error: null,
};

const handlePending = (state: BoardsState) => {
  state.isLoading = true;
};
const handleRejected = (state: BoardsState, action: PayloadAction<Error>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = (state: BoardsState) => {
  state.error = null;
  state.isLoading = false;
};

const boardsSlice = createSlice({
  name: "desk",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, handleFulfilledBoard)
      .addCase(fetchBoardById.fulfilled, handleFulfilledBoardById)
      .addCase(addBoard.fulfilled, handleFulfilledAddBoard)
      .addCase(updateBoard.fulfilled, handleFulfilledUpdateBoard)
      .addCase(deleteBoard.fulfilled, handleFulfilledDeleteBoard)
      .addCase(addList.fulfilled, handleFulfilledAddList)
      .addCase(updateList.fulfilled, handleFulfilledUpdateList)
      .addCase(deleteList.fulfilled, handleFulfilledDeleteList)
      .addCase(addTask.fulfilled, handleFulfilledAddTasks)
      .addCase(fetchTaskById.fulfilled, handleFulfilledTaskById)
      .addCase(updateTask.fulfilled, handleFulfilledUpdateTasks)
      .addCase(deleteTask.fulfilled, handleFulfilledDeleteTasks)
      .addMatcher((action) => action.type.endsWith("pending"), handlePending)
      .addMatcher((action) => action.type.endsWith("rejected"), handleRejected)
      .addMatcher(
        (action) => action.type.endsWith("fulfilled"),
        handleFulfilled
      );
  },
});

export const boardsReducer = boardsSlice.reducer;
