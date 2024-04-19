import { openModal } from "../../redux/modal/modalSlice";
import { deleteTask } from "../../redux/boards/task.thunk";
import { useEffect } from "react";
import { GetTask } from "../../types/tasks.types";
import { useAppDispatch } from "../../redux/hooks";
import toast from "react-hot-toast";
import { fetchTaskHistory } from "../../redux/action-logs/logs.thunk";

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
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-[#00000030] z-10"
        onClick={handleBackdropClick}
      ></div>
      <div className="absolute top-0 right-[15px] flex flex-col gap-2 w-[90px] rounded bg-[#e1e1e1] py-2 px-4 z-20">
        <button
          className="bg-[#e1e1e1] border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
          type="button"
          onClick={() => {
            dispatch(openModal());
            dispatch(fetchTaskHistory(task.id));
            setIsTaskOpen(true);
            close();
          }}
        >
          Open
        </button>
        <button
          className="bg-[#e1e1e1] border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
          type="button"
          onClick={() => {
            dispatch(openModal());
            dispatch(fetchTaskHistory(task.id));
            setIsEditOpen(true);
            close();
          }}
        >
          Edit
        </button>
        <button
          className="bg-[#e1e1e1] border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
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
