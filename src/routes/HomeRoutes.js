import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { NotificationHandler } from "../components/Notification";
import BackgroundImage from "../pages/Home/BackgroundImage";

const HomeRoutes = () => {
  return (
    <>
      <Navbar position="fixed" />
      <Sidebar />
      <NotificationHandler />
      <BackgroundImage />

      <Route exact path="/" component={Home} />
    </>
  );
};

export default HomeRoutes;
