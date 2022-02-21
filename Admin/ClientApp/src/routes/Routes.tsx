import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../components/Home";

interface RouteKey {
  [key: string]: {
    path: string;
    component: any;
  };
}

interface IRoute {
  Pages: RouteKey;
}

export const RoutesConstant: IRoute = {
  Pages: {
    Home: {
      path: "/",
      component: Home,
    },
  },
};

export const Routes: FC = () => {
  return (
    <Switch>
      {Object.keys(RoutesConstant.Pages).map((key) => (
        <Route
          key={key}
          exact
          path={RoutesConstant.Pages[key].path}
          component={RoutesConstant.Pages[key].component}
        />
      ))}
    </Switch>
  );
};
