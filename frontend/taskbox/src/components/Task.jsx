import { FiCalendar } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { format } from "date-fns";
import { PriorityColor } from "../../constants/constants";
import { customSelectStyles } from "./selectStyles";
import { updateTask } from "../../redux/boards/task.thunk";
import { useAppDispatch } from "../../redux/hooks";
import MySelect from "../ReactSelect/MySelect";

function TaskItem({ item, list, itemList }) {
  const dispatch = useAppDispatch();
  const selectOptions = list.map((i) => ({
    value: i,
    label: i,
  }));

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center w-full py-1">
        <p className="font-semibold w-[90%] overflow-hidden">{item.name}</p>
      </div>
      <p className="text-xs font-normal mb-3 text-[#909090]">
        {item.description}
      </p>
      <div className="flex items-center mb-3">
        <FiCalendar size={18} />
        <p className="font-medium text-[#909090] ml-2">
          {format(new Date(item.created_at), "EEE, dd MMM")}
        </p>
      </div>
      <div className="inline-flex items-center py-1 px-2 rounded-3xl bg-[#516a7a30] mb-3">
        <GoDotFill
          color={
            item.priority === "low"
              ? PriorityColor.low
              : item.priority === "high"
              ? PriorityColor.high
              : PriorityColor.medium
          }
        />
        <p className="inline-block ml-1 font-medium text-[#606060]">
          {item.priority}
        </p>
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
    </div>
  );
}
export default TaskItem;
