import { NavLink, useRouteError } from "react-router-dom";

type Error ={
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key:string]: any;
  name:string;
}

export const ErrorPage = () => {

  const error = useRouteError() as Error;

  return (
    <div className="error-page mt-5">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error?.statusText || error?.message} {' '}
          <NavLink to="/" className="no-underline">
            click here to go back to the main page
          </NavLink>
        </i>
      </p>
    </div>
  );
};
