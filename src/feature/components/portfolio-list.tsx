import { NavLink } from "react-router-dom";

export const PortfolioList = () => {
  return (
    <div className="mt-5 portfolio">
      <ul>
        <li>
          <div className="normal-text portfolio-element">
            <p className="project-list-color fs-4">Todo list application</p>

            <NavLink
              to="todo"
              className="remove-decoration project-list-color btn btn-primary mt-2 mb-3"
            >
              Lunch
            </NavLink>
            <p className="text-strong">
              {" "}
              <span className="text-strong">Tech Stack:</span> React, Typescript
              and Redux
            </p>
          </div>
        </li>

        <li>
          <div className="normal-text portfolio-element">
            <p className="project-list-color fs-4">Paint app</p>
            <NavLink
              to="paint"
              className="remove-decoration project-list-color btn btn-primary mt-2 mb-3"
            >
              Lunch
            </NavLink>

            <p className="text-strong">
              {" "}
              <span className="text-strong">Tech Stack:</span> React, Typescript
              and Redux
            </p>
          </div>
        </li>

        <li>
          <div className="normal-text portfolio-element">
            <p className="project-list-color fs-4">Capital cities quiz</p>
            <NavLink
              to="capitalcityquiz"
              className="remove-decoration project-list-color btn btn-primary mt-2 mb-3"
            >
              Lunch
            </NavLink>
            <p className="text-strong">
              <span className="text-strong">Tech Stack:</span> React, Typescript
              and Redux
            </p>
          </div>
        </li>

        <li>
          <div className="normal-text portfolio-element">
            <p className="project-list-color fs-4">More to come : )</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
