import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { NotificationHandler } from "../components/Notification";
import BackgroundImage from "../pages/Home/BackgroundImage";
import DesktopGuide from "../utils/DesktopGuide";

const HomeRoutes = () => {
  return (
    <>
      <DesktopGuide />
      <Navbar position="fixed" />
      {/* <Sidebar /> */}
      <NotificationHandler />
      <BackgroundImage />

      <Route exact path="/" component={Home} />
    </>
  );
};

export default HomeRoutes;
