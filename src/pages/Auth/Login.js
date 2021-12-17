import React from "react";
import { makeStyles } from "@mui/styles";
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
// import FormCreator from "../../components/FormCreator";
import { loginUser } from "../../redux/action/userActions";
import { useGoogleLogin } from "react-google-login";

import * as _gconsts from "../../constants/gConsts";
import setToken from "../../helpers/setToken";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogged } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (isLogged) {
      history.push("/");
    }
  }, [isLogged]);

  const { signIn, loaded } = useGoogleLogin({
    onSuccess: (data) => {
      console.log("access", data, data.accessToken, data.tokenObj);
      const token = data.accessToken;
      setToken(token, "google");
      handleLogin(data.profileObj, "google");
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
    dispatch(loginUser({ ...data, loginType: "google" }));
  };

  const handleGoogleLogin = async () => {
    signIn();
  };

  const handleMicrosoftLogin = () => { };

  const handleRegister = () => { };

  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.card}>
        <CardContent>
          <Typography variant="h4" mb={2} color="primary">Get Started</Typography>
          <Typography mb={2} color="secondary">
            Hi, Welcome back!
          </Typography>
          <div className={classes.loginBtns}>
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Card
                  elevation={0}
                  className={classes.iconBtn}
                  onClick={(e) => handleMicrosoftLogin(e)}
                >
                  <ButtonBase>
                    <CardContent>
                      <img
                        alt="microsoft"
                        src="images/mt.svg"
                        className={classes.icon}
                      />
                      <Typography
                        variant="subtitle1"
                      >
                        Login with Microsoft Teams
                      </Typography>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </Grid>
              <Grid item lg={6}>
                <Card
                  elevation={0}
                  className={classes.iconBtn}
                  onClick={() => handleGoogleLogin()}
                >
                  <ButtonBase>
                    <CardContent>
                      <img src="images/gc.svg" className={classes.icon} />
                      <Typography
                        variant="subtitle1"
                      >
                        Login with Google Classroom
                      </Typography>
                    </CardContent>
                  </ButtonBase>
                </Card>
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
          {/* <FormCreator
            mode={"add"}
            onSubmit={(e) => handleLogin(e)}
            formData={formData}
            submitText="Login"
          /> */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography><Link
              color="secondary"
              className={classes.link}
              onClick={() => history.push("/forgot-password")}
            >
              Forgot Password?
            </Link>
            </Typography>
          </div>

          <Typography className={classes.subTitle}>
            Don't have an account?{" "}
            <Link
              className={classes.link}
              onClick={handleRegister}
              onClick={() => history.push("/register")}
              color="secondary"
            >
              Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

const formData = [
  {
    type: "email",
    name: "email",
    label: "Email Address",
    placeholder: "Enter email address",
    required: true,
    size: 12,
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    required: true,
    size: 12,
  },
];

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
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(8),
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
    borderRadius: theme.spacing(5),
    boxShadow: "40px 40px 90px rgba(0, 0, 0, 0.12)",
  },
  subTitle: {
    color: theme.palette.gray[1200],
    letterSpacing: theme.spacing(0.1),
    fontSize: theme.palette.fontSizes.base,
    marginBottom: theme.spacing(2),
  },
  link: {
    letterSpacing: theme.spacing(0.1),
    fontSize: theme.palette.fontSizes.base,
    margin: theme.spacing(2, 0),
    fontWeight: theme.palette.fontWeights.semiBold,
    cursor: "pointer",
  },
  btn: {
    fontSize: theme.palette.fontSizes.semibase,
    padding: theme.spacing(1.5, 5),
  },
  iconBtn: {
    background: "transparent",
    width: "100%",
    height: "100%",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    display: "flex",
    borderRadius: theme.palette.radius.base,
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    transition: "all 0.3s ease-in-out",
    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
    },
    "&:hover": {
      background: theme.palette.primary.main,
      '& .MuiTypography-root': {
        color: theme.palette.white,
      },
      transform: "scale(1.01)",
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
    fontWeight: theme.palette.fontWeights.semiBold,
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

