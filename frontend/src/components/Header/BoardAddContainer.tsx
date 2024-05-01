import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addBoard, updateBoard } from "../../redux/boards/board.thunk";
import toast from "react-hot-toast";

interface TaskItemProps {
  board: { name: string; id: string };
  onClose: () => void;
}

function BoardAddContainer({ board, onClose }: TaskItemProps) {
  const [newBoardName, setNewBoardName] = useState(board.name);
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(() => {
    if (!newBoardName) {
      toast.error("Please fill board name");
      return;
    }
    if (!board.name && !board.id) {
      dispatch(addBoard({ name: newBoardName }));
      toast.success("Board created successful");
      onClose();
      return;
    }
    if (newBoardName === board.name) {
      toast.error("Please change board name");
      return;
    }
    if (board.name && board.id) {
      dispatch(
        updateBoard({
          id: board.id,
          name: newBoardName,
        })
      );
      toast.success("Board name changed successful");
      onClose();
    }
  }, [board.id, board.name, dispatch, newBoardName, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
      if (e.code === "Enter") {
        onSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onSubmit]);

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
      <div className="absolute top-m24px left-m8px w-50 flex flex-col gap-1 rounded bg-transparent py-1.5 px-2 z-30">
        <button
          className="bg-[#e1e1e1] w-[166px] h-9 border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
          color="dark"
          type="button"
          onClick={onSubmit}
        >
          {board.name === "" ? <p>Add new desk</p> : <p>Edit desk</p>}
        </button>
        <input
          maxLength={20}
          className="bg-gray-300 border border-gray-400 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
      </div>
    </>
  );
}
export default BoardAddContainer;
