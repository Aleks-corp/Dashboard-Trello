import { PayloadAction } from "@reduxjs/toolkit";
import { GetTask, NewTask } from "../../types/tasks.types";
import { BoardsState } from "../../types/state.types";
import { boardIndexFinder, listIdFinder } from "../../helpers/indexIdFinder";

export const handleFulfilledTaskById = (
  state: BoardsState,
  action: PayloadAction<GetTask>
): void => {
  state.task = action.payload;
};

export const handleFulfilledAddTasks = (
  state: BoardsState,
  action: PayloadAction<NewTask>
): void => {
  const { id, name, description, priority, list, created_at, updated_at } =
    action.payload;
  const boardIndex = boardIndexFinder(state.boards, list.id);
  const listIndex = state.boards[boardIndex].lists.findIndex(
    (item) => item.id === list.id
  );
  state.boards[boardIndex].lists[listIndex].tasks.push({
    id,
    name,
    description,
    priority,
    created_at,
    updated_at,
  });
  if (state.selectedBoard) {
    state.selectedBoard.lists[listIndex].tasks.push({
      id,
      name,
      description,
      priority,
      created_at,
      updated_at,
    });
  }
};

export const handleFulfilledUpdateTasks = (
  state: BoardsState,
  action: PayloadAction<NewTask>
): void => {
  const { id, name, description, priority, list, created_at, updated_at } =
    action.payload;
  const boardIndex = boardIndexFinder(state.boards, list.id);
  const oldList = state.boards[boardIndex].lists.find((l) =>
    l.tasks.find((t) => t.id === id)
  );
  if (oldList && oldList.id === list.id) {
    const listIndex = state.boards[boardIndex].lists.findIndex(
      (item) => item.id === list.id
    );
    const taskIndex = state.boards[boardIndex].lists[
      Number(listIndex)
    ].tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      state.boards[boardIndex].lists[listIndex].tasks.splice(taskIndex, 1, {
        id,
        name,
        description,
        priority,
        created_at,
        updated_at,
      });
    }
    if (state.selectedBoard) {
      state.selectedBoard.lists[listIndex].tasks.splice(taskIndex, 1, {
        id,
        name,
        description,
        priority,
        created_at,
        updated_at,
      });
    }
  } else if (oldList) {
    const oldListIndex = state.boards[boardIndex].lists.findIndex(
      (item) => item.id === oldList.id
    );
    const taskIndex = state.boards[boardIndex].lists[
      Number(oldListIndex)
    ].tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      state.boards[boardIndex].lists[oldListIndex].tasks.splice(taskIndex, 1);
    }
    if (state.selectedBoard) {
      state.selectedBoard.lists[oldListIndex].tasks.splice(taskIndex, 1);
    }
    const newListIndex = state.boards[boardIndex].lists.findIndex(
      (item) => item.id === list.id
    );
    state.boards[boardIndex].lists[newListIndex].tasks.push({
      id,
      name,
      description,
      priority,
      created_at,
      updated_at,
    });
    if (state.selectedBoard) {
      state.selectedBoard.lists[newListIndex].tasks.push({
        id,
        name,
        description,
        priority,
        created_at,
        updated_at,
      });
    }
  }
};

export const handleFulfilledDeleteTasks = (
  state: BoardsState,
  action: PayloadAction<string | undefined>
): void => {
  const taskId = action.payload;
  const listId = listIdFinder(state.boards, taskId);
  if (listId) {
    const boardIndex = boardIndexFinder(state.boards, listId);
    if (boardIndex !== -1) {
      const listIndex = state.boards[boardIndex].lists.findIndex(
        (item) => item.id === listId
      );
      if (listIndex !== -1) {
        const taskIndex = state.boards[boardIndex].lists[
          listIndex
        ].tasks.findIndex((i) => i.id === taskId);
        if (taskIndex !== -1) {
          state.boards[boardIndex].lists[listIndex].tasks.splice(taskIndex, 1);
        }
        if (state.selectedBoard) {
          state.selectedBoard.lists[listIndex].tasks.splice(taskIndex, 1);
        }
      }
    }
  }
};
