import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../Context/AuthUserProvider";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import Dashboard from "../components/Layouts/Dashboard";
import Admin from "../containers/Admin";

// const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => (
//       <Layout>
//         <Component {...props}></Component>
//       </Layout>
//     )}
//   ></Route>
// );

const PrivateRoute = ({ children, history }) => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser + "In PrivateRoute");

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, [currentUser, history]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default withRouter(PrivateRoute);
