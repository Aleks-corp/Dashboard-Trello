import { useAppSelector } from "../../redux/hooks";
import styles from "./Lists.module.css";
import { selectBoard } from "../../redux/selectors";
import { useState } from "react";
import Modal from "../Modal/Modal";
import AddNewCardModal from "../Modal/AddNewCardModal";
import TasksList from "../TasksList/TasksList";

function List() {
  const activeboard = useAppSelector(selectBoard);
  const [listName, setListName] = useState("");

  return (
    <>
      {activeboard && activeboard.lists.length !== 0 && (
        <div className={styles.TasksListContainer}>
          <ul className={styles.TasksLists}>
            {activeboard.lists.map((item) => (
              <li className={styles.TasksListsItem} key={item.id}>
                <TasksList
                  list={item}
                  lists={activeboard.lists.map((item) => item.name)}
                  setListName={setListName}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {listName && (
        <Modal clearModal={() => setListName("")}>
          <AddNewCardModal
            list={listName}
            clearListName={() => setListName("")}
          />
        </Modal>
      )}
    </>
  );
}
export default List;
