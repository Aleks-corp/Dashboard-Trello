import { deleteBoard } from "../../redux/boards/board.thunk";
import styles from "./BoardEditContainer.module.css";
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
      <div className={styles.Wrapper} onClick={handleBackdropClick}></div>
      <div className={styles.BoardEditWrapper}>
        <button
          className={styles.BoardEditButton}
          type="button"
          onClick={() => {
            onEdit();
            onClose();
          }}
        >
          Edit
        </button>
        <button
          className={styles.BoardEditButton}
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
