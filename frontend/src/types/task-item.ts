import { Props } from "react-select";
import { GetTask } from "./tasks.types";

export interface TaskItemProps {
  item: GetTask;
  list: string[];
  itemList: string;
}

export interface OptionType {
  value: string;
  label: string;
}

export type MySelectProps = Props<OptionType, false, never>;
