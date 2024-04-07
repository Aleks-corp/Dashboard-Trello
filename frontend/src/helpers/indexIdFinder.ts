import { GetBoards } from "../types/board.types";

export const boardIndexFinder = (
  boards: GetBoards[],
  listId: string | undefined
): number => {
  if (listId === undefined) {
    return -1;
  }
  const boardIndex = boards.findIndex((item) => {
    const bool = item.lists.some((i) => i.id === listId);
    return bool;
  });
  return boardIndex;
};

export const listIdFinder = (
  boards: GetBoards[],
  taskId: string | undefined
): string | null => {
  if (taskId === undefined) {
    return null;
  }
  let listId = null;
  boards.map((item) => {
    const list = item.lists.find((i) => {
      return i.tasks.some((i) => i.id === taskId);
    });
    if (list) listId = list.id;
  });

  return listId;
};
