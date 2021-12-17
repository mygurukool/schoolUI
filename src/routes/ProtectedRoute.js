import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { isLogged } = useSelector((state) => state.user);
  console.log("isLogged", isLogged);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLogged) {
          return <Redirect to="/login" />;
        }
        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};
export default ProtectedRoute;
