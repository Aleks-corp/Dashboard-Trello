import TaskItem from "./Task";

export default {
  component: TaskItem,
  title: "Task",
  tags: ["autodocs"],
};

export const Default = {
  args: {
    item: {
      id: 1,
      name: "Task1",
      description: "About",
      created_at: "1111.11.11",
      priority: "low",
    },
    list: ["Todo", "Completed"],
    itemList: "Todo",
  },
};
