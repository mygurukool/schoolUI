import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Submissions from "../pages/Submissions";
import Sidebar from "../components/Sidebar";
import { NotificationHandler } from "../components/Notification";

const HomeRoutes = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <NotificationHandler />

      <Route exact path="/" component={Home} />
    </>
  );
};

export default HomeRoutes;
