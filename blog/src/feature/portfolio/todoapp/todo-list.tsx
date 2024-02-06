import { Todo } from "../../../types";
import { TodoItem } from "./todo-item";

export interface TodoListProps {
  todos: Todo[];
}

export const TodoList = (todoListProps: TodoListProps) => {
  const { todos } = todoListProps;

  const todoList = todos.map((todo) => (
    <TodoItem key={todo.id} todoItem={todo} />
  ));

  return (
    <div>
      <ul className="todo-list">{todoList}</ul>
    </div>
  );
};
