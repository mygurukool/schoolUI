import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Fade,
  Grid,
  Stack,
  Step,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import useLanguages from "../../hooks/useLanguage";

import {
  acceptInvitation,
  checkIfInvited,
  getInvitationDetails,
} from "../../redux/action/commonActions";
import { ArrowRight } from "@mui/icons-material";
import validateEmail from "../../helpers/validateEmail";
import { showSnackBar } from "../../redux/action/snackActions";
import FormCreator from "../../components/Form/FormCreator";
import removeToken from "../../helpers/removeToken";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    // backgroundColor: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  InvitationImage: {
    height: "50vh",
    width: "50vh",
    objectFit: "contain",
  },
  centerStuff: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtn: {
    width: 200,
  },
}));

const Invitation = (props) => {
  const classes = useStyles();
  const formRef = React.useRef();

  const dispatch = useDispatch();
  const history = useHistory();
  const translate = useLanguages();
  const [invitation, setInvitation] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [isUserExist, setIsUserExist] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const isSpinner = useSelector((state) => state.util.spinner);

  const { type, id } = useParams();

  const onConfirmEmail = () => {
    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }

    dispatch(
      checkIfInvited(
        {
          id: invitation._id,
          email: email,
        },
        (res) => {
          console.log("invitation res", res.data.data.isUserExist);
          setIsUserExist(res.data.data.isUserExist);
          setStep(step + 1);
        },
        (err) => {
          dispatch(showSnackBar(err?.response.data.message, "error"));
        }
      )
    );
  };

  const onAcceptInvitation = (data) => {
    dispatch(
      acceptInvitation(
        { userData: data, isUserExist: isUserExist, invitation },
        () => {
          removeToken();
          history.push("/login");
        }
      )
    );
  };
  React.useEffect(() => {
    setIsLoading(true);
    dispatch(
      getInvitationDetails(
        id,
        (res) => {
          // console.log("getInvitationDetails", res);
          setInvitation(res.data.data);
          setIsLoading(false);
        },
        (err) => {
          setIsLoading(false);
        }
      )
    );
  }, []);

  const formData = [
    {
      type: "email",
      name: "email",
      label: translate("EMAIL_ADDRESS"),
      placeholder: translate("EMAIL_ADDRESS_PLACEHOLDER"),
      required: true,
      readOnly: isUserExist,
      size: 12,
    },
    ...(!isUserExist
      ? [
          {
            type: "text",
            name: "name",
            label: translate("FULL_NAME"),
            placeholder: translate("FULL_NAME_PLACEHOLDER"),
            required: true,
            size: 12,
          },
        ]
      : []),
    {
      type: "password",
      name: "password",
      label: translate("PASSWORD"),
      placeholder: translate("PASSWORD_PLACEHOLDER"),
      required: true,
      size: 12,
    },
    ...(!isUserExist
      ? [
          {
            type: "password",
            name: "repassword",
            label: translate("RE_ENTER_PASSWORD"),
            placeholder: translate("RE_ENTER_PASSWORD"),
            required: true,
            size: 12,
          },
        ]
      : []),
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <div className={classes.centerStuff}>
            <img
              src="/background/invitation.svg"
              alt="invitation image"
              className={classes.InvitationImage}
            />
          </div>
        </Grid>
        <Grid item lg={5} md={6} sm={6} xs={6}>
          <div className={classes.centerStuff}>
            {isLoading ? (
              <CircularProgress color="primary" size={40} />
            ) : (
              <Stack direaction="column" spacing={9}>
                <Typography variant="h6" color="secondary">
                  {translate("INVITED_TO_JOIN")} {invitation?.groupName} by{" "}
                  {invitation?.inviteeName}
                </Typography>

                <Fade in={step === 0} unmountOnExit={true}>
                  <Stack
                    direction="column"
                    spacing={4}
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <TextField
                      color="secondary"
                      variant="outlined"
                      lable="Email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                    />

                    <Button
                      size="large"
                      className={classes.continueBtn}
                      color="secondary"
                      variant="contained"
                      endIcon={
                        isSpinner ? <CircularProgress /> : <ArrowRight />
                      }
                      disabled={isSpinner}
                      onClick={onConfirmEmail}
                    >
                      Confirm
                    </Button>
                  </Stack>
                </Fade>
                <Fade in={step === 1} unmountOnExit={true}>
                  <Stack
                    direction="column"
                    spacing={4}
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <>
                      <FormCreator
                        ref={formRef}
                        mode={"edit"}
                        onSubmit={(e) => onAcceptInvitation(e)}
                        formData={formData}
                        data={{ email: email }}
                        hideButtons={true}
                      />
                      <Button
                        size="large"
                        className={classes.continueBtn}
                        color="secondary"
                        variant="contained"
                        endIcon={
                          isSpinner ? <CircularProgress /> : <ArrowRight />
                        }
                        disabled={isSpinner}
                        onClick={() => formRef.current.submit()}
                      >
                        Confirm
                      </Button>
                    </>
                  </Stack>
                </Fade>
              </Stack>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Invitation;

// import React from "react";
// import { makeStyles } from "@mui/styles";
// import { Card, CardContent, Typography } from "@mui/material";
// import { useParams, useHistory } from "react-router-dom";
// import FormCreator from "../../components/Form/FormCreator";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   acceptInvitation,
//   getInvitationDetails,
// } from "../../redux/action/commonActions";
// import { PERMISSIONS } from "../../constants";
// import removeToken from "../../helpers/removeToken";
// import { logoutUser } from "../../redux/action/userActions";
// import useLanguages from "../../hooks/useLanguage";
// const useStyles = makeStyles((theme) => ({
//   root: {
// width: "100%",
// height: "100vh",
// backgroundColor: theme.palette.primary.main,
// display: "flex",
// alignItems: "center",
// justifyContent: "center",
//   },
// }));

// const Invitation = (props) => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const { invitation } = useSelector((state) => state.common);

//   const handleJoin = (data) => {
//     dispatch(logoutUser());
//     if (data.password !== data.repassword) {
//       alert("passwords do not match");
//       return;
//     }
//     dispatch(
//       acceptInvitation(
//         {
//           ...data,
//           ...invitation,
//           role: type.toUpperCase(),
//           permissions: PERMISSIONS[type.toUpperCase()],
//         },
//         () => {
//           removeToken();
//           history.push("/login");
//         }
//       )
//     );
//   };

//   const { type, id } = useParams();

//   React.useEffect(() => {
//     dispatch(getInvitationDetails(id));
//   }, [id, dispatch]);
//   const translate = useLanguages()

// const formData = [
//   {
//     type: "email",
//     name: "email",
//     label: translate("EMAIL_ADDRESS"),
//     placeholder: translate("EMAIL_ADDRESS_PLACEHOLDER"),
//     required: true,
//     size: 12,
//   },
//   {
//     type: "text",
//     name: "name",
//     label: translate("FULL_NAME"),
//     placeholder: translate("FULL_NAME_PLACEHOLDER"),
//     required: true,
//     size: 12,
//   },
//   {
//     type: "password",
//     name: "password",
//     label: translate("PASSWORD"),
//     placeholder: translate("PASSWORD_PLACEHOLDER"),
//     required: true,
//     size: 12,
//   },
//   {
//     type: "password",
//     name: "repassword",
//     label: translate("RE_ENTER_PASSWORD"),
//     placeholder: translate("RE_ENTER_PASSWORD"),
//     required: true,
//     size: 12,
//   },
// ];

//   return (
//     <div className={classes.root}>
//       <Card sx={{ width: "50%" }}>
//         <CardContent>
//           <Typography variant="h6" textAlign="center">{translate("INVITED_TO_JOIN")}
//             {" "}
//             {invitation?.groupName} by {invitation?.inviteeName}
//           </Typography>
//         </CardContent>
//         <CardContent>
// <FormCreator
//   mode={"add"}
//   onSubmit={(e) => handleJoin(e, "mygurukool")}
//   formData={formData}
//   submitText="Login"
//   data={{}}
// />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Invitation;
