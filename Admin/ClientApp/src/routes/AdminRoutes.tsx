import React, { FC } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Home } from "../components/Admin/Home";
import { Login } from "../components/Admin/login/Login";
import { useAuth } from "../hooks/useAuth";

interface RouteKey {
  [key: string]: {
    path: string;
    component: any;
  };
}

interface IRoute {
  AdminLogin: RouteKey;
  AdminPages: RouteKey;
}

export const AdminRoutesConstant: IRoute = {
  AdminLogin: {
    Login: {
      path: "/admin/login",
      component: <Login />,
    },
  },
  AdminPages: {
    Home: {
      path: "/admin",
      component: <Home />,
    },
  },
};

export const AdminRoutes: FC = () => {
  return (
    <Switch>
      <Route
        exact
        path={AdminRoutesConstant.AdminLogin.Login.path}
        render={() => {
          const isLogin = useAuth();
          return isLogin ? (
            <Redirect to={AdminRoutesConstant.AdminPages.Home.path} />
          ) : (
            AdminRoutesConstant.AdminLogin.Login.component
          );
        }}
      />
      {Object.keys(AdminRoutesConstant.AdminPages).map((key) => (
        <Route
          key={key}
          exact
          path={AdminRoutesConstant.AdminPages[key].path}
          render={() => {
            return (
              <RequireAuth>
                {AdminRoutesConstant.AdminPages[key].component}
              </RequireAuth>
            );
          }}
        />
      ))}
    </Switch>
  );
};

export const RequireAuth: FC = ({ children }) => {
  const location = useLocation();
  const isLogin = useAuth();
  return (
    <React.Fragment>
      {isLogin ? (
        location.pathname === AdminRoutesConstant.AdminLogin.Login.path ? (
          <Redirect to={AdminRoutesConstant.AdminPages.Home.path} />
        ) : (
          children
        )
      ) : (
        <Redirect to={AdminRoutesConstant.AdminLogin.Login.path} />
      )}
    </React.Fragment>
  );
};
