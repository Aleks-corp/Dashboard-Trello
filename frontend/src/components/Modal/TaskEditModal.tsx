import { useState } from "react";
import { GetTask } from "../../types/tasks.types";
import MySelect from "../ReactSelect/MySelect";
import { customSelectStyles } from "../TaskItem/selectStyles";
import styles from "./TaskModal.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { updateTask } from "../../redux/boards/task.thunk";
import { closeModal } from "../../redux/modal/modalSlice";
import toast from "react-hot-toast";

interface Task {
  task: GetTask;
  lists: string[];
  itemList: string;
}

function TaskEditModal({ task, lists, itemList }: Task) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [list, setList] = useState(itemList);

  const selectOptionsList = lists.map((item) => ({ value: item, label: item }));

  const selectOptions = [
    { label: "low", value: "low" },
    {
      label: "medium",
      value: "medium",
    },
    {
      label: "high",
      value: "high",
    },
  ];
  function sendTask() {
    if (
      name === task.name &&
      description === task.description &&
      priority === task.priority &&
      list === itemList
    ) {
      toast.error("Task already exist");
      return;
    }
    if (name && description && priority && list) {
      dispatch(
        updateTask({
          id: task.id,
          name,
          description,
          priority,
          list,
        })
      );
      dispatch(closeModal());
    }
  }

  return (
    <div className={styles.TaskContainer}>
      <p className={styles.TaskTitle}>Edit Task</p>
      <div className={styles.TaskTextBox}>
        <p className={styles.TaskText}>Task name:</p>
        <input
          className={styles.TaskInput}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.TaskTextBox}>
        <p className={styles.TaskText}>Description:</p>
        <textarea
          className={styles.TaskTextArea}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className={styles.TaskTextBox}>
        <p className={styles.TaskText}>Priority:</p>
        <div className={styles.SelectBox}>
          <MySelect
            name="priority"
            defaultValue={selectOptions.filter(
              (item) => item.value === priority
            )}
            options={selectOptions}
            styles={customSelectStyles}
            onChange={(selectedOption) => {
              selectedOption && setPriority(selectedOption.value);
            }}
          />
        </div>
      </div>
      <div className={styles.TaskTextBox}>
        <p className={styles.TaskText}>List:</p>
        <div className={styles.SelectBox}>
          <MySelect
            name="list"
            defaultValue={selectOptionsList.filter(
              (item) => item.value === itemList
            )}
            options={selectOptionsList}
            styles={customSelectStyles}
            onChange={(selectedOption) => {
              selectedOption && setList(selectedOption.value);
            }}
          />
        </div>
      </div>
      <button
        className={styles.AddTaskBtn}
        type="button"
        onClick={() => sendTask()}
      >
        Save
      </button>
    </div>
  );
}
export default TaskEditModal;
