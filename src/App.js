import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import { setItem } from "./storage.js";

export default function App({ $target, initialState }) {
  try {
    const checkValidation = (stateInfo) => {
      if (Array.isArray(stateInfo)) {
        stateInfo.forEach((list, index) => {
          if (!list.text) throw new Error(`State[${index}] Validation Error!`);
        });
      } else {
        throw new Error("State Validation Error");
      }
      return stateInfo;
    };

    this.state = checkValidation(initialState);

    new Header({
      $target,
      text: "Simple Todo List",
    });

    new TodoForm({
      $target,
      onSubmit: (text) => {
        try {
          const nextState = checkValidation([
            ...todoList.state,
            { text, isCompleted: false },
          ]);
          todoList.setState(nextState);
          setItem("todos", JSON.stringify(nextState));
          todoCount.onChange(todoList.state);
        } catch (e) {
          alert(e.message);
        }
      },
    });

    const todoList = new TodoList({
      $target,
      initialState: this.state,
      onToggle: (clickedIndex) => {
        todoList.state[clickedIndex].isCompleted =
          !todoList.state[clickedIndex].isCompleted;
        setItem("todos", JSON.stringify(todoList.state));
        todoCount.onChange(todoList.state);
        todoList.render();
      },
      onRemove: (clickedIndex) => {
        todoList.state.splice(clickedIndex, 1);
        setItem("todos", JSON.stringify(todoList.state));
        todoCount.onChange(todoList.state);
        todoList.render();
      },
    });

    const todoCount = new TodoCount({
      $target,
      initialState: this.state,
      onChange: (nextState) => {
        document.querySelector("#todoCount").innerHTML = `${nextState.reduce(
          (acc, cur) => (cur.isCompleted ? ++acc : acc),
          0
        )} / ${nextState.length}`;
      },
    });
  } catch (e) {
    alert(e.message);
  }
}
