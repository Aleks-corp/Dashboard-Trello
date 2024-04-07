import { GetBoards } from "./board.types";
import { GetTask } from "./tasks.types";

export interface State {
  desk: {
    boards: GetBoards[];
    selectedBoard: GetBoards | null;
    task: GetTask | null;
    isLoading: boolean;
    error: Error | null;
  };
  modal: {
    isOpen: boolean;
    error: Error | null;
  };
}

export interface BoardsState {
  boards: GetBoards[];
  selectedBoard: GetBoards | null;
  task: GetTask | null;
  isLoading: boolean;
  error: Error | null;
}

export interface ModalState {
  isOpen: boolean;
  error: Error | null;
}
