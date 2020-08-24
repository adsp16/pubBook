import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Entry from "../containers/Entry";
import Admin from "../containers/Admin";

import Dashboard from "../components/Layouts/Dashboard";
import Front from "../components/Layouts/FrontLayout";

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
      <AppRoute
        path="/"
        component={Entry}
        layout={Front}
        exact={true}
      ></AppRoute>
      <AppRoute
        path="/admin-dashboard"
        component={Admin}
        layout={Dashboard}
        exact={true}
      ></AppRoute>
    </Router>
  );
};

export default AppRouter;
