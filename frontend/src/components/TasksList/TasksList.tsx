import { FiPlus } from "react-icons/fi";
import { useAppDispatch } from "../../redux/hooks";
import TaskItem from "../TaskItem/TaskItem";
import { openModal } from "../../redux/modal/modalSlice";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import ListEditContainer from "../ListEditContainer/ListEditContainer";
import { GetList } from "../../types/list.types";

interface ListProp {
  list: GetList;
  lists: string[];
  setListName: React.Dispatch<React.SetStateAction<string>>;
}

function TasksList({ list, lists, setListName }: ListProp) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <ListEditContainer list={list} close={() => setIsOpen(false)} />
      )}
      <div className="flex justify-between items-center w-full py-2 border-t-2 border-b-2 border-[#99999990] rounded-sm mb-2">
        <p className="font-base font-semibold">{list.name}</p>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <FiMoreVertical />
        </button>
      </div>

      <button
        className="flex justify-center items-center py-2 border border-dashed border-[#80808080] rounded w-full mb-2 hover:bg-[#8990a7] text-[#353845] hover:text-[#f6f7f9]"
        type="button"
        onClick={() => {
          dispatch(openModal());
          setListName(list.name);
        }}
      >
        <FiPlus width={24} />
        <p className="font-base font-medium ml-2">Add new card</p>
      </button>
      <ul className="flex flex-col gap-2">
        {list.tasks.map((task) => (
          <li
            className="w-full py-3 px-2 border border-[#80808080] rounded"
            key={task.id}
          >
            <TaskItem item={task} list={lists} itemList={list.name} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default TasksList;
