import React, { FC } from "react";
import { useLocation } from "react-router";
import { Container } from "reactstrap";
import { AdminNavMenu } from "./Admin/navmenus/NavMenu";
import { NavMenu } from "./navmenus/NavMenu";

export const Layout: FC = ({ children }) => {
  const location = useLocation();

  return (
    <React.Fragment>
      {location.pathname.includes("admin") ? <AdminNavMenu /> : <NavMenu />}
      <Container>{children}</Container>
    </React.Fragment>
  );
};
