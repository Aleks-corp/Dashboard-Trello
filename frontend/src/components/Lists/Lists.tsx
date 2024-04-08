import { useAppSelector } from "../../redux/hooks";
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
        <div className="flex item-center w-full h-calclisth max-w-7xl my-o mx-auto pt-4 px-7 overflow-hidden">
          <ul className="flex gap-4 w-full  overflow-x-auto">
            {activeboard.lists.map((item) => (
              <li className="relative w-60 flex-240" key={item.id}>
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
