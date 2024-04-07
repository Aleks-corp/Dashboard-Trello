import { GetTask } from "../../types/tasks.types";
import { format } from "date-fns";
import styles from "./TaskModal.module.css";

interface Task {
  task: GetTask;
  itemList: string;
  edit: () => void;
}

function TaskModal({ task, itemList, edit }: Task) {
  return (
    <div className={styles.TaskContainer}>
      <div className={styles.Wrapper}>
        <div>
          <p className={styles.TaskTitle}>{task.name}</p>
          <div className={styles.TaskTextBox}>
            <p className={styles.TaskText}>Status:</p>
            <span className={styles.TaskTextAccent}>{itemList}</span>
          </div>
          <div className={styles.TaskTextBox}>
            <p className={styles.TaskText}>Due Date:</p>
            <span className={styles.TaskTextAccent}>
              {format(new Date(task.created_at), "EEE, dd MMM")}
            </span>
          </div>
          <div className={styles.TaskTextBox}>
            <p className={styles.TaskText}>Priority:</p>
            <span className={styles.TaskTextAccent}>{task.priority}</span>
          </div>
          <div className={styles.TaskTextBox}>
            <p className={styles.TaskText}>Description:</p>
            <div className={styles.TaskDescriptionAccent}>
              {task.description}
            </div>
          </div>
        </div>
        <button
          className={styles.TaskEditButton}
          type="button"
          onClick={() => {
            edit();
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
export default TaskModal;
