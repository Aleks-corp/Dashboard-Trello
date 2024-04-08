import { deleteBoard } from "../../redux/boards/board.thunk";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import toast from "react-hot-toast";

interface TaskItemProps {
  id: string;
  onEdit: () => void;
  onClose: () => void;
}

function BoardEditContainer({ id, onEdit, onClose }: TaskItemProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-[#00000030] z-20"
        onClick={handleBackdropClick}
      ></div>
      <div className="absolute top-6 rigth-2.5 flex flex-col gap-1 rounded bg-[#e1e1e1] py-1.5 px-2 z-30">
        <button
          className="bg-[#e1e1e1] border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
          type="button"
          onClick={() => {
            onEdit();
            onClose();
          }}
        >
          Edit
        </button>
        <button
          className="bg-[#e1e1e1] border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
          type="button"
          onClick={() => {
            dispatch(deleteBoard(id));
            toast.success("Board deleted successful");
            onClose();
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
export default BoardEditContainer;
