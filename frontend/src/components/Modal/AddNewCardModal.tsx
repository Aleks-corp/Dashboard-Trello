import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
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
    <div className="px-8 py-4">
      <p className="text-2xl font-semibold mb-2">Add Card</p>
      <div className="flex items-center mb-4">
        <p className="text-lg font-medium">Status:</p>
        <span className="text-lg font-semibold ml-16">{list}</span>
      </div>
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
        className="ml-[255px] py-1 px-4 text-base font-medium border border-solid border-[#8990a7] rounded hover:bg-[#8990a7] hover:text-[#f6f7f9]"
        type="button"
        onClick={() => sendTask()}
      >
        Add
      </button>
    </div>
  );
}
export default AddNewCardModal;
