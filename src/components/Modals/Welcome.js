import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useModal from "../../hooks/useModal";
const useStyles = makeStyles((theme) => ({
  bg: {
    width: '100%',
    height: 170,
    backgroundImage: 'url(images/welcome.jpg)',
    backgroundSize: "100% 100%"
  },
}));


const WelcomeModal = () => {

  const classes = useStyles();
  const {
    open,
    openModal,
    closeModal,
  } = useModal();

  const handleClose = () => {
    closeModal()
    localStorage.setItem('haslogged', JSON.stringify(true))
  }

  React.useEffect(() => {
    const hasLogged = localStorage.getItem('haslogged')
    if (hasLogged) {
      return
    } else {
      openModal()
      localStorage.setItem('haslogged', JSON.stringify(true))
    }
  })
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="Add Website Link"
      maxWidth="xs"
    >
      <div className={classes.bg}>

      </div>
      <DialogTitle>
        <Typography sx={{ textAlign: 'center' }} variant="h5">Welcome to Mougli School</Typography>
      </DialogTitle>
      <DialogContent >
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
        <Button onClick={handleClose} variant="contained">START LEARNING</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeModal;
