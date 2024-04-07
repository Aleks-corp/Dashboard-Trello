import { GetList } from "./list.types";

export interface GetBoards {
  id: string;
  name: string;
  lists: GetList[];
  created_at: string;
  updated_at: string;
}

export interface BoardInList {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface AddBoard {
  name: string;
}

export interface UpdateBoard {
  id: string;
  name: string;
}
