import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../components/Admin/Home";

interface RouteKey {
  [key: string]: {
    path: string;
    component: any;
  };
}

interface IRoute {
  AdminPages: RouteKey;
}

export const AdminRoutesConstant: IRoute = {
  AdminPages: {
    Home: {
      path: "/admin",
      component: Home,
    },
  },
};

export const AdminRoutes: FC = () => {
  return (
    <Switch>
      {Object.keys(AdminRoutesConstant.AdminPages).map((key) => (
        <Route
          key={key}
          exact
          path={AdminRoutesConstant.AdminPages[key].path}
          component={AdminRoutesConstant.AdminPages[key].component}
        />
      ))}
    </Switch>
  );
};
