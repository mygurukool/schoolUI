import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Privacy from "../pages/Privacy";

const RouteData = () => {

  return (
    <BrowserRouter>

      <Route exact path="/" component={Home} />
      <Route exact path="/privacy" component={Privacy} />
    </BrowserRouter>
  )
};

export default RouteData;
