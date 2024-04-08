import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { GetList } from "../../types/list.types";
import { deleteList, updateList } from "../../redux/boards/list.thunk";
import toast from "react-hot-toast";

interface TaskItemProps {
  list: GetList;
  close: () => void;
}

function ListEditContainer({ list, close }: TaskItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [newListName, setNewListName] = useState(list.name);
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
        className="fixed top-0 left-0 w-screen h-screen bg-[#00000030] z-20"
        onClick={handleBackdropClick}
      ></div>
      {!isEdit ? (
        <div className="absolute top-0 right-[15px] w-[90px] flex flex-col gap-1 rounded bg-[#e1e1e1] py-1.5 px-2 z-30">
          <button
            className="bg-[#e1e1e1] border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
            type="button"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            Edit
          </button>
          <button
            className="bg-[#e1e1e1] border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
            type="button"
            onClick={() => {
              dispatch(deleteList(list.id));
              toast.success("List deleted successful");
            }}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="absolute top-1 right-[15px] w-[180px] flex flex-col gap-2 rounded bg-[#e1e1e1] py-1.5 px-2 z-30">
          <input
            maxLength={20}
            className="h-6 bg-gray-300 border border-gray-400 text-gray-900 text-m focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button
            className="bg-[#e1e1e1] border border-solid border-[#8990a7] rounded py-1 px-1.5 hover:bg-[#8990a7] hover:text-[#e1e1e1]"
            type="button"
            onClick={() => {
              if (!newListName) {
                toast.error("Please set List Name");
              }
              if (newListName === list.name) {
                toast.error("List Name is the same");
              }
              if (newListName && newListName !== list.name) {
                dispatch(updateList({ id: list.id, name: newListName }));
                toast.success("List name changed");
                close();
              }
            }}
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
}
export default ListEditContainer;
