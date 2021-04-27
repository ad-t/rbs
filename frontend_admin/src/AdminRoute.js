import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { fakeAuth } from './Login';

const AdminRoute = ({ children, ...rest }) => {
  const location = useLocation();

  console.log(rest);

  return (
    <Route {...rest}>
      {fakeAuth.isAuthenticated === true ?
        children
      :
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    </Route>
  );
};

export default AdminRoute;
