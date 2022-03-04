import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
// import { NotificationHandler } from "../components/Notification";
import BackgroundImage from "../pages/Home/BackgroundImage";
import DesktopGuide from "../guide/DesktopGuide";
import WelcomeGuide from "../guide/WelcomeGuide";

const HomeRoutes = () => {
  return (
    <>
      <DesktopGuide />
      <WelcomeGuide />

      <Navbar position="fixed" />
      {/* <Sidebar /> */}
      {/* <NotificationHandler /> */}
      <BackgroundImage />

      <Route exact path="/" component={Home} />
    </>
  );
};

export default HomeRoutes;
