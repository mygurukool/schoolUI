import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button onClick={onLearning} variant="contained">
            {translate("START_LEARNING")}
          </Button>
          <Button onClick={onStartTour} color="secondary" variant="contained">
            {translate("START_GUIDE")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WelcomeModal;
