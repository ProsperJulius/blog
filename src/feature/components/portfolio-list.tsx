import { NavLink } from "react-router-dom";

export const PortfolioList = () => {
  return (
    <div className="mt-5 portfolio">
      <div className="normal-text portfolio-element">
        <p className="project-list-color fs-4">
          Todo list application click{" "}
          <NavLink to="todo" className="remove-decoration project-list-color">
            here
          </NavLink>{" "}
          to open the app
        </p>

        <p className="text-strong">
          {" "}
          <span className="text-strong">Tech Stack:</span> React, Typescript and
          Redux
        </p>
      </div>

      <div className="normal-text portfolio-element">
        <p className="project-list-color fs-4">
          Paint app click{" "}
          <NavLink to="paint" className="remove-decoration project-list-color">
            here
          </NavLink>{" "}
          to open the app
        </p>

        <p className="text-strong">
          {" "}
          <span className="text-strong">Tech Stack:</span> React, Typescript and
          Redux
        </p>
      </div>

      <div className="normal-text portfolio-element">
        <p className="project-list-color fs-4">More to come : )</p>
      </div>
    </div>
  );
};
