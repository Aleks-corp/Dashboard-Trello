import { BoardInList } from "./board.types";
import { GetTask } from "./tasks.types";

export interface GetLists {
  id: string;
  name: string;
  tasks: GetTask[];
  board: BoardInList;
  created_at: string;
  updated_at: string;
}

export interface GetList {
  id: string;
  name: string;
  tasks: GetTask[];
  created_at: string;
  updated_at: string;
}

export interface AddList {
  name: string;
  board: string;
}

export interface UpdateList {
  id: string;
  name: string;
}

export interface UpdatedList {
  id: string;
  name: string;
  board: BoardInList;
  created_at: string;
  updated_at: string;
}

export interface IdsObj {
  listId: string;
  boardId: string;
}

export interface ListInTask {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
