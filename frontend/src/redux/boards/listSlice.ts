import { PayloadAction } from "@reduxjs/toolkit";
import { GetLists, UpdatedList } from "../../types/list.types";
import { BoardsState } from "../../types/state.types";
import { boardIndexFinder } from "../../helpers/indexIdFinder";

export const handleFulfilledAddList = (
  state: BoardsState,
  action: PayloadAction<GetLists>
): void => {
  const { id, name, board, created_at, updated_at } = action.payload;
  const index = state.boards.findIndex(
    (element) => element.name === board.name
  );
  if (index !== -1) {
    state.boards[index].lists.push({
      id,
      name,
      created_at,
      updated_at,
      tasks: [],
    });
  }
  if (state.selectedBoard) {
    state.selectedBoard.lists.push({
      id,
      name,
      created_at,
      updated_at,
      tasks: [],
    });
  }
};

export const handleFulfilledUpdateList = (
  state: BoardsState,
  action: PayloadAction<UpdatedList>
): void => {
  const { id, name, created_at, updated_at, board } = action.payload;
  const boardIndex = state.boards.findIndex((item) => item.id === board.id);
  if (boardIndex !== -1) {
    const listIndex = state.boards[boardIndex].lists.findIndex(
      (item) => item.id === id
    );
    if (boardIndex !== -1) {
      state.boards[boardIndex].lists[listIndex] = {
        ...state.boards[boardIndex].lists[listIndex],
        ...{ name, created_at, updated_at },
      };
    }
    if (state.selectedBoard) {
      state.selectedBoard.lists[listIndex] = {
        ...state.selectedBoard.lists[listIndex],
        ...{ name, created_at, updated_at },
      };
    }
  }
};

export const handleFulfilledDeleteList = (
  state: BoardsState,
  action: PayloadAction<string | undefined>
): void => {
  const boardIndex = boardIndexFinder(state.boards, action.payload);
  if (boardIndex !== -1) {
    const listIndex = state.boards[boardIndex].lists.findIndex(
      (item) => item.id === action.payload
    );
    if (boardIndex !== -1) {
      state.boards[boardIndex].lists.splice(listIndex, 1);
    }
    if (state.selectedBoard) {
      state.selectedBoard.lists.splice(listIndex, 1);
    }
  }
};
