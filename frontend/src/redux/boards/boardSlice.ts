import { PayloadAction } from "@reduxjs/toolkit";
import { BoardsState } from "../../types/state.types";
import { GetBoards, GetBoard } from "../../types/board.types";

export const handleFulfilledBoard = (
  state: BoardsState,
  action: PayloadAction<GetBoards[]>
): void => {
  state.boards = action.payload;
};

export const handleFulfilledBoardById = (
  state: BoardsState,
  action: PayloadAction<GetBoard>
): void => {
  state.selectedBoard = action.payload;
};

export const handleFulfilledAddBoard = (
  state: BoardsState,
  action: PayloadAction<GetBoard>
): void => {
  state.boards.push({ ...action.payload });
  state.selectedBoard = { ...action.payload, lists: [] };
};

export const handleFulfilledUpdateBoard = (
  state: BoardsState,
  action: PayloadAction<GetBoards>
): void => {
  const updatedBoard = action.payload;
  const index = state.boards.findIndex((board) => board.id === updatedBoard.id);
  if (index !== -1) {
    state.boards.splice(index, 1, updatedBoard);
  }
  if (state.selectedBoard) {
    state.selectedBoard.name = updatedBoard.name;
  }
};

export const handleFulfilledDeleteBoard = (
  state: BoardsState,
  action: PayloadAction<string | undefined>
): void => {
  const boardIndex = state.boards.findIndex(
    (item) => item.id === action.payload
  );
  if (boardIndex !== -1) {
    state.boards.splice(boardIndex, 1);
  }
  state.selectedBoard = null;
};
