import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "../pages/about";
import Home from "../pages/Home";
import Privacy from "../pages/Privacy";
import Footer from "../components/Footer"
import Contact from "../pages/contact";

const RouteData = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/privacy" component={Privacy} />
      <Footer />
    </BrowserRouter>
  )
};

export default RouteData;
