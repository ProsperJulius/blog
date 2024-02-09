import { NavLink } from "react-router-dom";
import { clearCompleted } from "../../../app/slices/todoapp/todo-slice";
import { useAppDispatch } from "../../../app/hooks";

export interface TodoFooterProps {
  allTodos: number;
  completed: number;
}

export const Footer = (toDoFooterProps: TodoFooterProps) => {
  const dispatch = useAppDispatch();
  const [ALL, ACTIVE, COMPLETED] = ["#all", "#active", "#completed"];
  const { allTodos, completed } = toDoFooterProps;

  if (!allTodos) return <></>;

  return (
    <>
      <footer className="footer">
        <span className="todo-count">{`${
          allTodos - completed
        } items left!`}</span>
        <div className="filters">
          <ul>
            <li key={ALL}>
              {" "}
              <NavLink to={ALL}>All</NavLink>{" "}
            </li>

            <li key={ACTIVE}>
              {" "}
              <NavLink to={ACTIVE}>Active</NavLink>{" "}
            </li>

            <li key={COMPLETED}>
              {" "}
              <NavLink to={COMPLETED}>Completed</NavLink>{" "}
            </li>
          </ul>
        </div>
        {completed ? (
          <a
            className="clear-completed"
            onClick={() => dispatch(clearCompleted())}
          >
            Clear Completed
          </a>
        ) : (
          <></>
        )}
      </footer>
    </>
  );
};
