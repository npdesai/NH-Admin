import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { MainLayout } from "./components/Layout";
import { AdminRoutes } from "./routes/AdminRoutes";
import { Routes } from "./routes/Routes";
import "./custom.scss";

export default () => (
  <MainLayout>
    <Switch>
      <Route path="/admin*" component={AdminRoutes} />
      <Route exact path="/*" component={Routes} />
    </Switch>
  </MainLayout>
);
