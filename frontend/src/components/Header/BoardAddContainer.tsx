import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addBoard, updateBoard } from "../../redux/boards/board.thunk";
import styles from "./BoardAddContainer.module.css";
import toast from "react-hot-toast";

interface TaskItemProps {
  board: { name: string; id: string };
  onClose: () => void;
}

function BoardAddContainer({ board, onClose }: TaskItemProps) {
  const [newBoardName, setNewBoardName] = useState(board.name);
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
      <div className={styles.Wrapper} onClick={handleBackdropClick}></div>
      <div className={styles.TaskEditWrapper}>
        <button
          className={styles.HeaderButton}
          color="dark"
          type="button"
          onClick={() => {
            if (!newBoardName) {
              toast.error("Please fill board name");
              return;
            }
            if (!board.name && !board.id) {
              dispatch(addBoard({ name: newBoardName }));
              toast.success("Board created successful");
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
          }}
        >
          {board.name === "" ? <p>Add new desk</p> : <p>Edit desk</p>}
        </button>
        <input
          className="bg-gray-300 border border-gray-400 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
      </div>
    </>
  );
}
export default BoardAddContainer;
