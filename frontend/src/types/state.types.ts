import { GetBoards, GetBoard } from "./board.types";
import { Log } from "./logs.types";
import { GetTask } from "./tasks.types";

export interface State {
  desk: BoardsState;
  modal: ModalState;
  log: HistoryState;
}

export interface BoardsState {
  boards: GetBoards[];
  selectedBoard: GetBoard | null;
  task: GetTask | null;
  isLoading: boolean;
  error: Error | null;
}

export interface ModalState {
  isOpen: boolean;
  error: Error | null;
}

export interface HistoryState {
  logs: Log[];
  taskLogs: Log[];
  isLoading: boolean;
  isOpen: boolean;
  error: Error | null;
}
