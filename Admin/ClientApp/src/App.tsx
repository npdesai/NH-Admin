import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AdminRoutes } from "./routes/AdminRoutes";
import { Routes } from "./routes/Routes";
import "./custom.css";

export default () => (
  <Layout>
    <Switch>
      <Route path="/admin*" component={AdminRoutes} />
      <Route exact path="/*" component={Routes} />
    </Switch>
  </Layout>
);
