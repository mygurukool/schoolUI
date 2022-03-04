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
const useStyles = makeStyles((theme) => ({
  bg: {
    width: "100%",
    height: 170,
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

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        title="Add Website Link"
        maxWidth="xs"
      >
        <div className={classes.bg} />

        <DialogTitle>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Welcome to Mougli School
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography sx={{ mb: 1 }}>Dear {name},</Typography>
            <Typography sx={{ mb: 1 }}>
              {isCreator
                ? "Congratulations on setting up your Organization"
                : "Congratulations on joining Organization"}{" "}
              {organization?.organizationName}
            </Typography>
            <Typography>
              Welcome to the world of future of Education, fun way to learn!!
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
            START LEARNING
          </Button>
          <Button onClick={onStartTour} color="secondary" variant="contained">
            START A TOUR GUIDE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WelcomeModal;
