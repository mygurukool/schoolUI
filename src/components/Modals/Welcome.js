import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useModal from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  toggleWelcomeGuide,
  toggleGuide,
} from "../../redux/action/utilActions";
import Joyride from "react-joyride";
import useLanguages from "../../hooks/useLanguage";
const useStyles = makeStyles((theme) => ({
  bg: {
    width: "100%",
    height: 220,
    backgroundImage: "url(images/welcome.jpg)",
    backgroundSize: "100% 100%",
    [theme.breakpoints.up('xs')]: {
      height: 130,
    },
    [theme.breakpoints.up('sm')]: {
      height: 220,
    },
  },
}));

const WelcomeModal = () => {
  const classes = useStyles();
  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { name, organization, id } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const open = modalOpen === "welcome";
  // const {
  //   open,
  //   openModal,
  //   closeModal,
  // } = useModal();

  const handleClose = () => {
    dispatch(closeModal());
    // localStorage.setItem('haslogged', JSON.stringify(true))
  };

  // React.useEffect(() => {
  //   const hasLogged = localStorage.getItem('haslogged')
  //   if (hasLogged) {
  //     return
  //   } else {
  //     openModal()
  //     localStorage.setItem('haslogged', JSON.stringify(true))
  //   }
  // })

  const isCreator = organization?.userId === id;

  const onLearning = () => {
    handleClose();
    dispatch(toggleWelcomeGuide());
  };

  const onStartTour = () => {
    handleClose();
    dispatch(toggleGuide());
  };
  const translate = useLanguages()
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <div className={classes.bg} />

        <DialogTitle>
          <Typography sx={{ textAlign: "center" }} variant="h6">
            {translate("WELCOME_TO_MOUGLI_SCHOOL")}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography sx={{ mb: 1 }}> {translate("DEAR")} {name},</Typography>
            <Typography sx={{ mb: 1 }}>
              {isCreator
                ? translate("CONG_SETUP_ORG")
                : translate("CONG_JOINING_ORG")}{" "}
              {organization?.organizationName}
            </Typography>
            <Typography>
              {translate("WELCOME_MESSAGE")}
            </Typography>
          </DialogContentText>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Button fullWidth onClick={onLearning} variant="contained">
                {translate("START_LEARNING")}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>

              <Button fullWidth onClick={onStartTour} color="secondary" variant="contained">
                {translate("START_GUIDE")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>

      </Dialog>
    </>
  );
};

export default WelcomeModal;
