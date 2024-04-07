import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import styles from "./BoardAddContainer.module.css";
import { addList } from "../../redux/boards/list.thunk";
import toast from "react-hot-toast";

interface TaskItemProps {
  boardName: string;
  onClose: () => void;
}

function ListAddContainer({ boardName, onClose }: TaskItemProps) {
  const [newListName, setNewListName] = useState("");
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
            if (newListName) {
              dispatch(
                addList({
                  board: boardName,
                  name: newListName,
                })
              );
              toast.success("List created successful");
              onClose();
            }
          }}
        >
          <p>Add new list</p>
        </button>
        <input
          className="bg-gray-300 border border-gray-400 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
      </div>
    </>
  );
}
export default ListAddContainer;
