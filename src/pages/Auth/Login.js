import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Link,
  ButtonBase,
} from "@mui/material";
import { useHistory } from "react-router-dom";
//dynamic form  creator
import FormCreator from "../../components/Form/FormCreator";
import { loginUser } from "../../redux/action/userActions";
import { useGoogleLogin } from "react-google-login";

import * as _gconsts from "../../constants/gConsts";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/action/utilActions";
import useModal from "../../hooks/useModal";
import useLanguages from "../../hooks/useLanguage";
import ComingSoonModal from "../../components/Modals/CommingSoon";
const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogged } = useSelector((state) => state.user);
  const translate = useLanguages()


  React.useEffect(() => {
    if (isLogged) {
      history.push("/");
    }
  }, [isLogged]);

  const { signIn, loaded } = useGoogleLogin({
    onSuccess: (data) => {
      console.log("access", data, data.accessToken, data.tokenObj);
      const token = data.accessToken;
      handleLogin({ ...data.profileObj, token: token }, "google");
    },

    clientId:
      "629959808842-k1hnr6f2pkfbv9n1fnekpn8gkl659crc.apps.googleusercontent.com",

    isSignedIn: false,
    fetchBasicProfile: true,

    onFailure: (data) => console.log("glogin fail", data),
    scope: _gconsts.REACT_APP_GOOGLE_OAUTH_SCOPES,
  });

  //login functions
  const handleLogin = (data, loginType) => {
    dispatch(
      loginUser({ ...data, loginType: loginType }, () => {
        if (loginType === 'google') {
          const hasGoogleLoggedIn = localStorage.getItem("googleLoginCount")
          console.log('hasGoogleLoggedIn', hasGoogleLoggedIn, loginType);
          if (!hasGoogleLoggedIn) {
            localStorage.setItem("googleLoginCount", JSON.stringify(true))
            dispatch(openModal("googlewarning"));
          } else {
            dispatch(openModal("welcome"));
          }
        } else {
          dispatch(openModal("welcome"));
        }
        // const hasLogged = localStorage.getItem("haslogged");
        // if (hasLogged) {
        //   return;
        // } else {
        // localStorage.setItem("haslogged", JSON.stringify(true));
        // }
      })
    );
  };

  const handleGoogleLogin = async () => {
    signIn();
  };

  const formData = [
    {
      type: "email",
      name: "email",
      label: translate("EMAIL_ADDRESS"),
      placeholder: translate("EMAIL_ADDRESS_PLACEHOLDER"),
      required: true,
      size: 12,
    },
    {
      type: "password",
      name: "password",
      label: translate("PASSWORD"),
      placeholder: translate("PASSWORD_PLACEHOLDER"),
      required: true,
      size: 12,
    },
  ];

  const handleMicrosoftLogin = () => {
    dispatch(openModal("msLogin"));
  };
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <ComingSoonModal />
      <Card elevation={0} className={classes.card}>
        <CardContent>
          <Typography variant="h4" mb={2} color="inherit">
            {translate("GET_STARTED")}
          </Typography>
          <Typography mb={2} variant="body2" color="inherit">
            {translate("WELCOME_BACK")}
          </Typography>
          <div className={classes.loginBtns}>
            <Grid container spacing={2}>
              <Grid item lg={6} sm={6} md={6} xs={12}>
                <ButtonBase
                  className={classes.iconBtn}
                  style={{ border: `1px solid ${theme.palette.primary.main}` }}
                  onClick={(e) => handleMicrosoftLogin(e)}
                >
                  <CardContent>
                    <img
                      alt="microsoft"
                      src="images/mt.svg"
                      className={classes.icon}
                    />
                    <Typography variant="subtitle1">
                      {translate("LOGIN_TO_MT")}
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Grid>
              <Grid item lg={6} sm={6} md={6} xs={12}>
                <ButtonBase
                  className={classes.iconBtn}
                  style={{ border: `1px solid ${theme.palette.primary.main}` }}
                  onClick={() => handleGoogleLogin()}
                >
                  <CardContent>
                    <img src="images/gc.svg" className={classes.icon} />
                    <Typography variant="subtitle1">
                      {translate("LOGIN_TO_GC")}
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Grid>
            </Grid>
          </div>
          <div className={classes.centerLogo}>
            <div className={classes.hrLine} />
            <div className={classes.centerLogoImgCont}>
              <img src="images/mygurukool.svg" />
            </div>
            <div className={classes.hrLine} />
          </div>
          <Typography
            className={classes.subTitle}
            color="inherit"
            variant="subtitle1"
            sx={{ mb: 2 }}
          >
            {translate("LOGIN_TO_MS")}
          </Typography>
          <FormCreator
            mode={"add"}
            onSubmit={(e) => handleLogin(e, "mygurukool")}
            formData={formData}
            submitText="Login"
            data={{
              email: "demoteacher@mougli.school",
              password: "12345678",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography>
              <Link
                color="inherit"
                className={classes.link}
                onClick={() => history.push("/forgot-password")}
              >
                {translate("FORGOT_PASSWORD")}
              </Link>
            </Typography>
          </div>

          <Typography className={classes.subTitle}>
            {translate("CREATE_OWN")}{" "}
            <Link
              className={classes.link}
              onClick={() => history.push("/register")}
              color="inherit"
            >
              {translate("SCHOOL_ACCOUNT")}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

//styles

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.white,
    backgroundImage: "url(images/bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(8),
  },
  loginBtns: {
    width: "100%",
  },
  topTitle: {
    color: theme.palette.secondary.main,
    textTransform: "uppercase",
    fontSize: theme.palette.fontSizes.sm,
    fontWeight: theme.palette.fontWeights.bold,
    marginBottom: theme.spacing(2),
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: theme.palette.fontWeights.bolder,
    textTransform: "capitalize",
    fontSize: theme.palette.fontSizes["4xl"],
    marginBottom: theme.spacing(2),
  },
  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(20px)",
    padding: theme.spacing(2.5, 5),
    width: "45%",
    height: "auto",
    borderRadius: theme.spacing(5),
    boxShadow: "40px 40px 90px rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      height: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "85%",
      height: "auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "65%",
      height: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      width: "55%",
      height: "auto",
    },
    [theme.breakpoints.up("xl")]: {
      width: "45%",
      height: "auto",
    },
  },
  subTitle: {
    textAlign: "center",
    padding: theme.spacing(2, 0),
  },
  link: {
    margin: theme.spacing(2, 0),
    cursor: "pointer",
  },
  btn: {
    fontSize: theme.palette.fontSizes.semibase,
    padding: theme.spacing(1.5, 5),
  },
  iconBtn: {
    width: "100%",
    height: "100%",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    transition: "all 0.3s ease-in-out",
    "& .MuiTypography-root": {
      color: theme.palette.primary.main,
    },
    "&:hover": {
      background: theme.palette.primary.main,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",

      "& .MuiTypography-root": {
        color: theme.palette.white,
      },
    },
    "&:last-child": {
      marginBottom: theme.spacing(0),
    },
  },
  icon: {
    flex: 0,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  btnText: {
    flex: 1,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  centerLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2, 0),
  },
  hrLine: {
    width: "100%",
    position: "relative",
    borderBottom: `1px solid ${theme.palette.gray[800]}`,
  },
  centerLogoImgCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    boxShadow: "2px 2px 10px #ddd",
    borderRadius: theme.palette.radius.bigger,
    "& img": {
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
    },
  },
}));
