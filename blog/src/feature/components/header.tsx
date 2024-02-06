import classNames from "classnames";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="nav-bar">
        <ul>
          <li>
            <NavLink
              to="/"
              className={classNames({ "remove-decoration": pathname !== "/" })}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/portfolio"
              className={classNames({
                "remove-decoration": !pathname.includes('/portfolio'),
              })}
            >
              Portfolio
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/resume"
              className={classNames({
                "remove-decoration": pathname !== "/resume",
              })}
            >
              Resume
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
