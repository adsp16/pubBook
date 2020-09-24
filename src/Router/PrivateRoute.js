import React, { useContext, useEffect } from "react";
import { withRouter, Redirect, Route } from "react-router-dom";
import { AuthContext } from "../Context/AuthUserProvider";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const PrivateRoute = ({ component, layout, path, history, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log(currentUser + "Private Route currentUser");
  //   if (!currentUser) {
  //     console.log("push from Proute ran");
  //     console.log(currentUser);
  //     // history.push("/login");
  //   }
  // }, [currentUser]);

  // if (isLoading) return <div>...Loading</div>;

  return currentUser ? (
    <AppRoute
      {...rest}
      path={path}
      component={component}
      layout={layout}
    ></AppRoute>
  ) : (
    <Redirect to={"/login"} />
  );
};

export default withRouter(PrivateRoute);
