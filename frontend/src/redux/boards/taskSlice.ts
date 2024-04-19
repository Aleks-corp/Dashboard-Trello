import { PayloadAction } from "@reduxjs/toolkit";
import { GetTask, NewTask } from "../../types/tasks.types";
import { BoardsState } from "../../types/state.types";
import { listIdFinder } from "../../helpers/indexIdFinder";

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

  if (state.selectedBoard) {
    const listIndex = state.selectedBoard.lists.findIndex(
      (item) => item.id === list.id
    );
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
  if (state.selectedBoard) {
    const oldList = state.selectedBoard.lists.find((l) =>
      l.tasks.find((t) => t.id === id)
    );
    if (oldList && oldList.id === list.id) {
      const listIndex = state.selectedBoard.lists.findIndex(
        (item) => item.id === list.id
      );
      const taskIndex = state.selectedBoard.lists[
        Number(listIndex)
      ].tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
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
      const oldListIndex = state.selectedBoard.lists.findIndex(
        (item) => item.id === oldList.id
      );
      const taskIndex = state.selectedBoard.lists[
        Number(oldListIndex)
      ].tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.selectedBoard.lists[oldListIndex].tasks.splice(taskIndex, 1);
      }
      const newListIndex = state.selectedBoard.lists.findIndex(
        (item) => item.id === list.id
      );
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
  const listId = listIdFinder(state.selectedBoard, taskId);
  if (listId) {
    if (state.selectedBoard) {
      const listIndex = state.selectedBoard.lists.findIndex(
        (item) => item.id === listId
      );
      if (listIndex !== -1) {
        const taskIndex = state.selectedBoard.lists[listIndex].tasks.findIndex(
          (i) => i.id === taskId
        );
        if (taskIndex !== -1) {
          state.selectedBoard.lists[listIndex].tasks.splice(taskIndex, 1);
        }
      }
    }
  }
};
