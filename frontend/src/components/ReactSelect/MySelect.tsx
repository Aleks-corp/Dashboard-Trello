import Select from "react-select";
import { MySelectProps } from "../../types/task-item";

const MySelect: React.FC<MySelectProps> = (props) => {
  return <Select {...props} />;
};
export default MySelect;
