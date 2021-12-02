import Task from "../components/Task";

export default {
  title: "component/Task",
  component: Task,
};

export const Default = () => {
  const task = {
    content: "출근",
    complete: false,
  };
  return <Task content={task.content} complete={task.complete}></Task>;
};
