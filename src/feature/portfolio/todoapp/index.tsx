import { useMemo } from "react";
import { TodoList } from "./todo-list";
import { useLocation } from "react-router-dom";
import { Todo } from "../../../types";
import { Header } from "./header";
import { Footer } from "./footer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  TodoPeriod,
  changeTodoPeriod,
} from "../../../app/slices/todoapp/todo-slice";
import { TODO_PERIODS } from "../../../app/common/constants";
import { HelperFunctions } from "../../../app/utils";

export const TodoApp = () => {
  const { hash: currentFilter } = useLocation();
  const selectedPeriod = useAppSelector(
    (state) => state.todoSlice.selectedPeriod
  );
  const dispatch = useAppDispatch();

  const todos = useAppSelector(
    (state) => state.todoSlice.todos[selectedPeriod]
  );
  const optionsList = TODO_PERIODS.map((period) => {
    return (
      <option value={period} key={period} >
        {HelperFunctions.capitalizeFirstLetter(period)}
      </option>
    );
  });

  const completedTodos: Todo[] =
    todos?.filter((todos) => todos.isCompleted) ?? [];

  const todosToDisplay = useMemo(() => {
    if (currentFilter === "#active") {
      return todos?.filter((todo) => !todo.isCompleted);
    } else if (currentFilter === "#all") {
      return todos;
    } else if (currentFilter === "#completed") {
      return todos?.filter((todo) => todo.isCompleted);
    }
    return todos;
  }, [currentFilter, todos]);

  return (
    <div className="todo-header-container">
      <div className="todo-header-element">
        <div className="todo-body">
          <div className="todoapp">
            <div className="main">
              <Header />
              <TodoList todos={todosToDisplay ?? []} />

              <Footer
                allTodos={todos?.length ?? 0}
                completed={completedTodos.length}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <select
        className="todo-select"
          id="period-select"
          value={selectedPeriod}
          onChange={(e) =>
            dispatch(changeTodoPeriod(e.target.value as TodoPeriod))
          }
        >
          {optionsList}
        </select>
      </div>
    </div>
  );
};
