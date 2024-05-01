import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addList } from "../../redux/boards/list.thunk";
import toast from "react-hot-toast";

interface TaskItemProps {
  boardName: string;
  onClose: () => void;
}

function ListAddContainer({ boardName, onClose }: TaskItemProps) {
  const [newListName, setNewListName] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(() => {
    if (!newListName) {
      toast.error("Please fill list name");
    }
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
  }, [boardName, dispatch, newListName, onClose]);

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
      <div className="absolute top-[-6px] left-m8px w-50 flex flex-col gap-1 rounded bg-transparent py-1.5 px-2 z-30">
        <button
          className="bg-[#e1e1e1] h-9 border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
          color="dark"
          type="button"
          onClick={onSubmit}
        >
          <p>Add new list</p>
        </button>
        <input
          maxLength={20}
          className="bg-gray-300 border border-gray-400 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
      </div>
    </>
  );
}
export default ListAddContainer;
