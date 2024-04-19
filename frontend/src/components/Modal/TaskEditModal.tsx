import { useState } from "react";
import { GetTask } from "../../types/tasks.types";
import MySelect from "../ReactSelect/MySelect";
import { customSelectStyles } from "../TaskItem/selectStyles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateTask } from "../../redux/boards/task.thunk";
import { closeModal } from "../../redux/modal/modalSlice";
import toast from "react-hot-toast";
import { selectTaskLogs } from "../../redux/selectors";

interface Task {
  task: GetTask;
  lists: string[];
  itemList: string;
}

function TaskEditModal({ task, lists, itemList }: Task) {
  const logs = useAppSelector(selectTaskLogs);
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
      toast.success("Task updated successful");
      dispatch(closeModal());
    } else {
      !name && toast.error("Please fill name field");
      !list && toast.error("Please choose list field");
      !description && toast.error("Please fill description field");
      !priority && toast.error("Please choose priority");
    }
  }

  return (
    <div className="flex w-[650px]">
      <div className="w-[60%] pl-8 py-4">
        <p className="text-2xl font-semibold mb-2">Edit Task</p>
        <div className="flex items-center mb-4">
          <p className="text-lg font-medium">Task name:</p>
          <input
            minLength={3}
            maxLength={20}
            className="text-base font-medium ml-8 px-1 w-[200px] border border-solid border-[#8990a7] rounded focus:border-2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex mb-4">
          <p className="text-lg font-medium">Description:</p>
          <textarea
            minLength={6}
            maxLength={250}
            className="text-base font-medium ml-6 p-1 w-[200px] h-[100px] border border-solid border-[#8990a7] rounded focus:border-2 focus:outline-none"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center mb-4">
          <p className="text-lg font-medium">Priority:</p>
          <div className="flex ml-14 w-[200px]">
            <MySelect
              name="priority"
              menuPlacement="top"
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
        <div className="flex items-center mb-4">
          <p className="text-lg font-medium">List:</p>
          <div className="flex ml-[88px] w-[200px]">
            <MySelect
              name="list"
              menuPlacement="top"
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
          className="ml-[255px] py-1 px-4 text-base font-medium border border-solid border-[#8990a7] rounded hover:bg-[#8990a7] hover:text-[#f6f7f9]"
          type="button"
          onClick={() => sendTask()}
        >
          Save
        </button>
      </div>
      <div className="bg-[#8890a0] w-[40%] pr-8 py-4">
        <p className="text-2xl font-semibold ml-8 text-[#f6f7f9]">History</p>
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
export default TaskEditModal;
