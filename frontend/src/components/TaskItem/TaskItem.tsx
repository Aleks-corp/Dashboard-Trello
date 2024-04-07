import { FiMoreVertical } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { format } from "date-fns";
import styles from "./TaskItem.module.css";
import { OptionType, TaskItemProps } from "../../types/task-item";
import { PriorityColor } from "../../constants/constants";
import { customSelectStyles } from "./selectStyles";
import { updateTask } from "../../redux/boards/task.thunk";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import MySelect from "../ReactSelect/MySelect";
import TaskEditContainer from "../TaskEditContainer/TaskEditContainer";
import Modal from "../Modal/Modal";
import TaskModal from "../Modal/TaskModal";
import TaskEditModal from "../Modal/TaskEditModal";

function TaskItem({ item, list, itemList }: TaskItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const dispatch = useAppDispatch();
  const selectOptions: OptionType[] = list.map((item: string) => ({
    value: item,
    label: item,
  }));

  return (
    <div className={styles.TaskContainer}>
      {isOpen && (
        <TaskEditContainer
          task={item}
          close={() => setIsOpen(false)}
          setIsEditOpen={setIsEditOpen}
          setIsTaskOpen={setIsTaskOpen}
        />
      )}
      <div className={styles.TaskNameContainer}>
        <p className={styles.TaskName}>{item.name}</p>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <FiMoreVertical />
        </button>
      </div>
      <p className={styles.TaskDesc}>{item.description}</p>
      <div className={styles.TaskDateWrapper}>
        <FiCalendar size={18} />
        <p className={styles.TaskDate}>
          {format(new Date(item.created_at), "EEE, dd MMM")}
        </p>
      </div>
      <div className={styles.TaskPriorityWrapper}>
        <GoDotFill
          color={
            item.priority === "low"
              ? PriorityColor.low
              : item.priority === "high"
                ? PriorityColor.high
                : PriorityColor.medium
          }
        />
        <p className={styles.TaskPriority}>{item.priority}</p>
      </div>
      <MySelect
        name="taskList"
        placeholder="Move to:"
        options={selectOptions}
        styles={customSelectStyles}
        menuPosition={"absolute"}
        menuPlacement={"top"}
        onChange={(selectedOption) => {
          if (selectedOption && itemList !== selectedOption.value) {
            const taskIdToUpdate = {
              id: item.id,
              list: selectedOption.value,
            };
            dispatch(updateTask(taskIdToUpdate));
          }
        }}
      />
      {isEditOpen && (
        <Modal clearModal={() => setIsEditOpen(false)}>
          <TaskEditModal task={item} lists={list} itemList={itemList} />
        </Modal>
      )}
      {isTaskOpen && (
        <Modal clearModal={() => setIsTaskOpen(false)}>
          <TaskModal
            task={item}
            itemList={itemList}
            edit={() => {
              setIsTaskOpen(false);
              setIsEditOpen(true);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
export default TaskItem;
