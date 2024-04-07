import { ListInTask } from "./list.types";

export interface GetTask {
  id: string;
  name: string;
  description: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

export interface NewTask {
  id: string;
  name: string;
  description: string;
  priority: string;
  list: ListInTask;
  created_at: string;
  updated_at: string;
}

export interface AddTask {
  name: string;
  description: string;
  priority: string;
  list: string;
}

export interface UpdateTask {
  id: string;
  name?: string;
  description?: string;
  priority?: string;
  list?: string;
}

export interface TaskIdsObj {
  taskId: string;
  listId: string;
}
