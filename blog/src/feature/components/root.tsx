import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import Header from "./header";

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
