import { FiPlus } from "react-icons/fi";
import { useAppDispatch } from "../../redux/hooks";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TasksList.module.css";
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
      <div className={styles.ListNameContainer}>
        <p className={styles.ListsItemText}>{list.name}</p>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <FiMoreVertical />
        </button>
      </div>

      <button
        className={styles.TasksListsAddButton}
        type="button"
        onClick={() => {
          dispatch(openModal());
          setListName(list.name);
        }}
      >
        <span className={styles.TasksListsIconWrapper}>
          <FiPlus width={24} />
        </span>
        Add new card
      </button>
      <ul className={styles.TaskList}>
        {list.tasks.map((task) => (
          <li className={styles.TaskListItem} key={task.id}>
            <TaskItem item={task} list={lists} itemList={list.name} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default TasksList;
