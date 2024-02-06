import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <p className="text-center mt-5 md-5">
        The page you are looking can not be found click  {"  "}
        <NavLink to="/" className="no-underline">
          Here
        </NavLink>
        to go back to the home page
      </p>
    </div>
  );
};
