import { openModal } from "../../redux/modal/modalSlice";
import { deleteTask } from "../../redux/boards/task.thunk";
import styles from "./TaskEditContainer.module.css";
import { useEffect } from "react";
import { GetTask } from "../../types/tasks.types";
import { useAppDispatch } from "../../redux/hooks";
import toast from "react-hot-toast";

interface TaskItemProps {
  task: GetTask;
  close: () => void;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskEditContainer({
  task,
  close,
  setIsEditOpen,
  setIsTaskOpen,
}: TaskItemProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.currentTarget === event.target) {
      close();
    }
  };

  return (
    <>
      <div className={styles.Wrapper} onClick={handleBackdropClick}></div>
      <div className={styles.TaskEditWrapper}>
        <button
          className={styles.TaskEditButton}
          type="button"
          onClick={() => {
            dispatch(openModal());
            setIsTaskOpen(true);
            close();
          }}
        >
          Open
        </button>
        <button
          className={styles.TaskEditButton}
          type="button"
          onClick={() => {
            dispatch(openModal());
            setIsEditOpen(true);
            close();
          }}
        >
          Edit
        </button>
        <button
          className={styles.TaskEditButton}
          type="button"
          onClick={() => {
            dispatch(deleteTask(task.id));
            toast.success("Task deleted successful");
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
export default TaskEditContainer;
