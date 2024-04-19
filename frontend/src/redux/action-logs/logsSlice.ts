import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HistoryState } from "../../types/state.types";
import { fetchHistory, fetchTaskHistory } from "./logs.thunk";
import { Log } from "../../types/logs.types";

const initialState: HistoryState = {
  logs: [],
  taskLogs: [],
  isOpen: false,
  isLoading: false,
  error: null,
};

const handlePending = (state: HistoryState) => {
  state.isLoading = true;
};
const handleRejected = (state: HistoryState, action: PayloadAction<Error>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = (state: HistoryState) => {
  state.error = null;
  state.isLoading = false;
};

const handleFulfilledHistory = (
  state: HistoryState,
  action: PayloadAction<Log[]>
) => {
  state.logs = action.payload;
};

const handleFulfilledTaskHistory = (
  state: HistoryState,
  action: PayloadAction<Log[]>
) => {
  state.taskLogs = action.payload;
};

const logsSlice = createSlice({
  name: "log",
  initialState: initialState,
  reducers: {
    clearTaskLogs: (state: HistoryState) => {
      state.taskLogs = [];
    },
    openLogs: (state: HistoryState) => {
      state.isOpen = true;
    },
    closeLogs: (state: HistoryState) => {
      state.isOpen = false;
      state.logs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.fulfilled, handleFulfilledHistory)
      .addCase(fetchTaskHistory.fulfilled, handleFulfilledTaskHistory)
      .addMatcher((action) => action.type.endsWith("pending"), handlePending)
      .addMatcher((action) => action.type.endsWith("rejected"), handleRejected)
      .addMatcher(
        (action) => action.type.endsWith("fulfilled"),
        handleFulfilled
      );
  },
});

export const { clearTaskLogs, openLogs, closeLogs } = logsSlice.actions;
export const logsReducer = logsSlice.reducer;
