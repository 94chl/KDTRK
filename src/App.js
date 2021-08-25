import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import { setItem } from "./storage.js";

export default function App({ $target, initialState }) {
  new Header({
    $target,
    text: "Simple Todo List",
  });

  new TodoForm({
    $target,
    onSubmit: (text) => {
      const nextState = [...todoList.state, { text, isCompleted: false }];
      todoList.setState(nextState);
      setItem("todos", JSON.stringify(nextState));
      todoCount.onChange(todoList.state);
    },
  });

  const todoList = new TodoList({
    $target,
    initialState,
    isCompleted: (clickedIndex) => {
      todoList.state[clickedIndex].isCompleted =
        !todoList.state[clickedIndex].isCompleted;
      todoCount.onChange(todoList.state);
    },
    onRemove: (clickedIndex) => {
      todoList.state.splice(clickedIndex, 1);
      setItem("todos", JSON.stringify(todoList.state));
      todoCount.onChange(todoList.state);
    },
  });

  const todoCount = new TodoCount({
    $target,
    initialState,
    onChange: (nextState) => {
      document.querySelector("#todoCount").innerHTML = `${nextState.reduce(
        (acc, cur) => (cur.isCompleted ? ++acc : acc),
        0
      )} / ${nextState.length}`;
    },
  });
}
