import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./feature/components/root";
import { HomePage } from "./feature/components/home-page";
import { Resume } from "./feature/components/resume";
import { ErrorPage } from "./feature/components/error-page";
import { NotFound } from "./feature/components/note-found";
import { TodoApp } from "./feature/portfolio/todoapp";
import { PortfolioList } from "./feature/components/portfolio-list";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { fetchLocalTodos } from "./app/slices/todo-slice";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "resume", element: <Resume /> },

      {
        path: "portfolio",
        children: [
          { index: true, element: <PortfolioList /> },
          { path: "todo", element: <TodoApp /> },
        ],
      },

      { path: "error", element: <NotFound /> },
    ],
  },
]);

store.dispatch(fetchLocalTodos()); /// dispatch action to fetch todos from the local forage

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
