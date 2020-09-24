import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Entry from "../containers/Entry";
import Admin from "../containers/Admin";
import Login from "../components/Auth/Login";

import Dashboard from "../components/Layouts/Dashboard";
import Front from "../components/Layouts/FrontLayout";
import AuthLayout from "../components/Layouts/AuthLayout";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props}></Component>
      </Layout>
    )}
  ></Route>
);

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <AppRoute
          path="/"
          component={Entry}
          layout={Front}
          exact={true}
        ></AppRoute>
        <AppRoute
          path="/login"
          component={Login}
          layout={AuthLayout}
          exact={true}
        ></AppRoute>
        <PrivateRoute
          path="/admin-dashboard"
          component={Admin}
          layout={Dashboard}
          exact={true}
        ></PrivateRoute>
      </Switch>
    </Router>
  );
};

export default AppRouter;
