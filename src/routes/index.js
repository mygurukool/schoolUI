import React from "react";
// import { useSelector } from "react-redux";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Invitation from "../pages/Invitation";

import Forgot from "../pages/Auth/Forgot";
import { makeStyles } from "@mui/styles";
import ProtectedRoute from "./ProtectedRoute";
import HomeRoutes from "./HomeRoutes";
import useAutoLogin from "../hooks/useAutoLogin";
import Spinner from "../components/Spinner";
import Privacy from "../pages/Privacy";
// import AnimatedSwitch from "./AnimatedSwitch";
import i18n from "../i18n";
import languages from "../utils/languages.json";

import Util from "./Util";
const lang = i18n.language;
const changeLanguage = lng => {
  i18n.changeLanguage(lng);
};

let App = ({ match, location }) => {
  if (lang != match.params.locale) {
    changeLanguage(match.params.locale);
  }
  return (
    <div>
      <Switch>
        <ProtectedRoute exact path={`${match.url}`} component={HomeRoutes} />
        <Route exact path={`${match.url}/login`} component={Login} />
        <Route exact path={`${match.url}/forgot-password`} component={Forgot} />
        <Route exact path={`${match.url}/register`} component={Register} />
        <Route exact path={`${match.url}/invitation/:type/:id`} component={Invitation} />
        <Route exact path={`${match.url}/privacy`} component={Privacy} />
      </Switch>
    </div>
  );
};

const RouteData = () => {
  const { ready } = useAutoLogin();
  const handleDetectLanguage = () => {
    const detectedLang = navigator.language || navigator.userLanguage
    const findLang = detectedLang.indexOf('-') > -1 ? detectedLang.substr(0, detectedLang.indexOf('-')) : detectedLang
    const checkLang = languages.findIndex(l => l.code === findLang)
    return checkLang >= 0 ? findLang : 'en'
  }
  return ready ? (
    <BrowserRouter>
      <Util />
      {/* <AnimatedSwitch> */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          overflowX: "hidden",
        }}
      >
        <Switch>
          <Route path="/:locale" component={App} />
          <Redirect to={`/${handleDetectLanguage()}`} />
        </Switch>
      </div>
      {/* </AnimatedSwitch> */}
    </BrowserRouter>
  ) : (
    <Spinner />
  );
};

export default RouteData;


// /* global gapi */

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { useDispatch, useSelector } from "react-redux";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import SnackComponent from "../components/Common/Snackbar";
// import SpinnerModal from "../components/Common/Modals/SpinnerModal";
// import checkIfAppReady from "../helper/checkIfAppReady"
// import Login from "../pages/auth/Login";
// import Forgot from "../pages/auth/Forgot";
// import Register from "../pages/auth/Register";
// import Home from '../pages/Home'
// import * as _gconsts from '../utils/gConsts'
// import ProtectedRoute from "./ProtectedRoute";
// import NavBar from "../components/Navbar";
// import { getGoogleLoginDetails, getUserDetails } from "../redux/action/userActions";
// import { setLoginType } from "../redux/action/utilActions";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//     // backgroundColor: theme.palette.white,
//   },
//   main: {
//     width: '90%',
//     margin: 'auto',
//     height: '100vh',
//   },
// }));

// const Routes = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch()
//   // const spinner = useSelector((state) => state.util.spinner);
//   const { isLogged, role = "student" } = useSelector(state => state.user)
//   const ready = checkIfAppReady();

//   const googleUpdateSigninStatus = (isSignedIn) => {

//     if (isSignedIn) {
//       let token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token
//       localStorage.setItem(_constants.ACCESS_TOKEN, token)
//       window.location.href = '/home'
//     } else {
//       localStorage.setItem(_constants.ACCESS_TOKEN, "")
//       window.location.href = '/'
//     }
//   }
//   React.useEffect(() => {
//     gapi.load('auth2', () => {
//       var auth2 = gapi.auth2.init({
//         client_id: '629959808842-k1hnr6f2pkfbv9n1fnekpn8gkl659crc.apps.googleusercontent.com',
//         'discoveryDocs': ['https://classroom.googleapis.com/$discovery/rest?version=v1'],
//         scope: _gconsts.REACT_APP_GOOGLE_OAUTH_SCOPES,
//       }).then(() => {
//         // console.log("google api - client init:done")
//         // console.log("gapi: " + JSON.stringify(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token))
//         localStorage.setItem("gapi", window.gapi.auth2.getAuthInstance())
//         gapi.auth2.getAuthInstance().isSignedIn.listen(googleUpdateSigninStatus);
//         dispatch(getUserDetails())
//       })

//     })
//   }, [])
// const getHomepage = (role, props) => {
//   if (!localStorage.getItem(_constants.ACCESS_TOKEN)) {
//     return <Redirect to="/login" />
//   }
//   else if (!isLogged) {
//     return <Redirect to="/login" />
//   }
//   return <Redirect to="/home" />;
// };

//   React.useEffect(() => {
//     getHomepage(role)
//   }, [isLogged])

//   return ready ? (
//     <div className={classes.root}>
//       <SnackComponent />
//       <BrowserRouter>
//         <Switch >
//           <Route path="/" exact render={(props) => getHomepage(role, props)} />
//           <Route
//             exact
//             path="/login"
//             component={Login}
//           />
//           <Route
//             exact
//             path="/forgot-password"
//             component={Forgot}
//           />
//           <Route
//             exact
//             path="/register"
//             component={Register}
//           />
// <div className={classes.main}>
//   <NavBar />
//   <Route
//     exact
//     path="/home"
//     component={Home}
//     roles={['TEACHER']}
//   />
// </div>
//         </Switch>
//       </BrowserRouter>
//     </div>
//   ) : <SpinnerModal />;
// };
// export default Routes;
