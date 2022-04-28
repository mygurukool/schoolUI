import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
// import { NotificationHandler } from "../components/Notification";
import BackgroundImage from "../pages/Home/BackgroundImage";
import DesktopGuide from "../guide/DesktopGuide";
import WelcomeGuide from "../guide/WelcomeGuide";
import i18n from "../i18n";

const HomeRoutes = () => {
  return (
    <>
      <DesktopGuide />
      <WelcomeGuide />

      <Navbar position="fixed" />
      {/* <Sidebar /> */}
      {/* <NotificationHandler /> */}
      <BackgroundImage />

      <Route exact path={`/${i18n.language}`} component={Home} />
    </>
  );
};

export default HomeRoutes;
