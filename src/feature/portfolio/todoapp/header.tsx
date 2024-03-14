import { useState } from "react";
import { addTodo } from "../../../app/slices/todoapp/todo-slice";
import { useAppDispatch } from "../../../app/hooks";

export const Header = () => {
  const [input, setInput] = useState<string>("");

  const dispatch = useAppDispatch();
  const addTodoItem = (event: { key: string }) => {
    if (event.key != "Enter") return;

    if (input) {
      dispatch(addTodo({ content: input }));
    }

    setInput(""); // reset input
  };

  return (
    <header className="header">
      <div className="todo-header-container">
        <h1>todos</h1>
        
      </div>

      <input
        className="new-todo"
        value={input}
        onKeyDown={addTodoItem}
        onInput={(e) => setInput(e.currentTarget.value)}
        placeholder="What needs to be done?"
      />
    </header>
  );
};
