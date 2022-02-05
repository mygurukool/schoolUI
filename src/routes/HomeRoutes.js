import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Submissions from "../pages/Submissions";
import Sidebar from "../components/Sidebar"

const HomeRoutes = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Route exact path="/" component={Home} />
    </>
  );
};

export default HomeRoutes;
