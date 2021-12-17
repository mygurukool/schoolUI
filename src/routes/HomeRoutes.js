import React from "react";
import { Route } from "react-router";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
const HomeRoutes = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/" component={Home} />
    </div>
  );
};

export default HomeRoutes;
