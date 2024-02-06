import { useState } from "react";
import { Todo } from "../../../types";
import { useAppDispatch } from "../../../app/hooks";
import { completeTodo, deleteTodo, editTodo } from "../../../app/slices/todo-slice";
import classNames from "classnames";

export interface TodoItemProps {
  todoItem: Todo;
}
export const TodoItem = (todoItemProps: TodoItemProps) => {
  const { todoItem } = todoItemProps;
  const [input, setInput] = useState<string>(todoItem.content);

  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState<boolean>(false);

  const handleToggle = () => {
    const newTodoItem: Todo = {
      ...todoItem,
      isCompleted: !todoItem.isCompleted,
    };
    dispatch(completeTodo(newTodoItem));
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = (event: { key: string }) => {
    if (event.key != "Enter") return;
    if (input) {
      dispatch(editTodo({ ...todoItem, content: input }));
      setEditing(false);
    }
  };

  let element;

  if (editing) {
    element = (
      <input
        type="text"
        defaultValue={input}
        onKeyDown={handleSave}
        onInput={(e) => setInput(e.currentTarget.value)}
        onMouseOut={() => setEditing(false)}
      />
    );
  } else {
    element = (
      <div>
        <input
          className="toggle"
          style={{border:"none"}}
          type="checkbox"
          checked={todoItem.isCompleted}
          onChange={handleToggle}
        />

        <label className="view" onDoubleClick={handleDoubleClick}>
          {" "}
          {todoItem.content}
        </label>
        <button
          className="destroy todo-button"
          onClick={() => dispatch(deleteTodo(todoItem))}
        />
      </div>
    );
  }

  return (
    <li
      className={classNames(
        { completed: todoItem.isCompleted },
        { edit: editing },{view:true}
      )}
      key={todoItem.id}
    >
      {element}
    </li>
  );
};
