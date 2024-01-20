import { useMemo } from "react";
import { TodoList } from "./todo-list";
import { useLocation } from "react-router-dom";
import { Todo } from "../../../types";
import { Header } from "./header";
import { Footer } from "./footer";
import { useAppSelector } from "../../../app/hooks";

export const TodoApp = () => {
  const { hash: currentFilter } = useLocation();

  const todos = useAppSelector((state) => state.todoSlice.todos);
  console.log(todos,"them todos")

  const completedTodos: Todo[] = todos.filter((todos) => todos.isCompleted);

  const todosToDisplay = useMemo(() => {
    if (currentFilter === "#active") {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (currentFilter === "#all") {
      return todos;
    } else if (currentFilter === "#completed") {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
  }, [currentFilter, todos]);

  return (
    <div className="todo-body">
      <div className="todoapp">
        <div className="main">
          <Header />
          <TodoList todos={todosToDisplay} />

          <Footer allTodos={todos.length} completed={completedTodos.length} />
        </div>
      </div>
    </div>
  );
};
