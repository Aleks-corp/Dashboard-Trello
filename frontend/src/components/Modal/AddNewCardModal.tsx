import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import styles from "./AddNewCardModal.module.css";
import { addTask } from "../../redux/boards/task.thunk";
import MySelect from "../ReactSelect/MySelect";
import { customSelectStyles } from "../TaskItem/selectStyles";
import { closeModal } from "../../redux/modal/modalSlice";
import toast from "react-hot-toast";

interface List {
  list: string;
  clearListName: () => void;
}

function AddNewCardModal({ list, clearListName }: List) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

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
    if (name && description && list && priority) {
      dispatch(
        addTask({
          name,
          description,
          priority: priority,
          list: list,
        })
      );
      dispatch(closeModal());
      toast.success("Task created successful");
      clearListName();
    }
  }

  return (
    <div className={styles.AddTaskContainer}>
      <p className={styles.TaskTitle}>Add Card</p>
      <div className={styles.TaskTextBox}>
        <p className={styles.TaskText}>Status:</p>{" "}
        <span className={styles.TaskTextAccent}>{list}</span>
      </div>
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
            defaultValue={selectOptions[0]}
            options={selectOptions}
            styles={customSelectStyles}
            onChange={(selectedOption) => {
              selectedOption && setPriority(selectedOption.value);
            }}
          />
        </div>
      </div>

      <button
        className={styles.AddTaskBtn}
        type="button"
        onClick={() => sendTask()}
      >
        Add
      </button>
    </div>
  );
}
export default AddNewCardModal;
