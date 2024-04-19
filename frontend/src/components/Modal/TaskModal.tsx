// import { fetchTaskHistory } from "../../redux/action-logs/logs.thunk";
import { useAppSelector } from "../../redux/hooks";
import { selectTaskLogs } from "../../redux/selectors";
import { GetTask } from "../../types/tasks.types";
import { format } from "date-fns";

interface Task {
  task: GetTask;
  itemList: string;
  edit: () => void;
}

function TaskModal({ task, itemList, edit }: Task) {
  const logs = useAppSelector(selectTaskLogs);
  return (
    <div className="flex w-[650px]">
      <div className="w-[60%] px-8 py-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-2xl font-semibold mb-2">{task.name}</p>
          <button
            className="py-1 px-4 text-base font-medium border border-solid border-[#8990a7] rounded hover:bg-[#8990a7] hover:text-[#f6f7f9]"
            type="button"
            onClick={() => {
              edit();
            }}
          >
            Edit
          </button>
        </div>
        <div className="flex items-center mb-2">
          <p className="text-lg font-medium">Status:</p>
          <span className="font-semibold ml-16">{itemList}</span>
        </div>
        <div className="flex items-center mb-2">
          <p className="text-lg font-medium">Due Date:</p>
          <span className="font-semibold ml-10">
            {format(new Date(task.created_at), "EEE, dd MMM")}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <p className="text-lg font-medium">Priority:</p>
          <span className="font-semibold ml-[58px]">{task.priority}</span>
        </div>
        <div className="flex mb-4">
          <p className="text-lg font-medium">Description:</p>
          <p className="font-semibold ml-5 max-w-[230px] max-h-[180px] p-1 overflow-auto border border-solid border-[#8990a7] rounded">
            {task.description}
          </p>
        </div>
      </div>
      <div className="bg-[#8890a0] w-[40%] px-8 py-4">
        <p className="text-2xl font-semibold  text-[#f6f7f9]">History</p>
        {logs.length !== 0 && (
          <ul>
            {logs.map((log) => (
              <li key={log.id}>{log.actionType}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default TaskModal;
