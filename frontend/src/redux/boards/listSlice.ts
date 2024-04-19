import { PayloadAction } from "@reduxjs/toolkit";
import { GetLists, UpdatedList } from "../../types/list.types";
import { BoardsState } from "../../types/state.types";

export const handleFulfilledAddList = (
  state: BoardsState,
  action: PayloadAction<GetLists>
): void => {
  const { id, name, created_at, updated_at } = action.payload;
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
  const { id, name, created_at, updated_at } = action.payload;

  if (state.selectedBoard) {
    const listIndex = state.selectedBoard.lists.findIndex(
      (item) => item.id === id
    );
    state.selectedBoard.lists[listIndex] = {
      ...state.selectedBoard.lists[listIndex],
      ...{ name, created_at, updated_at },
    };
  }
};

export const handleFulfilledDeleteList = (
  state: BoardsState,
  action: PayloadAction<string | undefined>
): void => {
  if (state.selectedBoard) {
    const listIndex = state.selectedBoard.lists.findIndex(
      (item) => item.id === action.payload
    );
    state.selectedBoard.lists.splice(listIndex, 1);
  }
};
