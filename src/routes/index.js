import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "../pages/about";
import Home from "../pages/Home";
import Privacy from "../pages/Privacy";
import Footer from "../components/Footer"
import Contact from "../pages/contact";
import Snack from "../components/Snack"
import i18n from "../i18n";
import { connect } from "react-redux";

const lang = i18n.language;
const changeLanguage = lng => {
  i18n.changeLanguage(lng);
};

let App = ({ match, location }) => {
  console.log("location", location);
  console.log("match", match);

  if (lang != match.params.locale) {
    changeLanguage(match.params.locale);
  }
  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}/`} component={Home} />
        <Route exact path={`${match.url}/about`} component={About} />
        <Route exact path={`${match.url}/contact`} component={Contact} />
        <Route exact path={`${match.url}/privacy`} component={Privacy} />
      </Switch>
    </div>
  );
};


const RouteData = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Snack />
      <Switch>
        <Route path="/:locale" component={App} />
        <Redirect to="/en" />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
};

export default RouteData;
