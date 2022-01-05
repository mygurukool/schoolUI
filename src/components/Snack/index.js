import React from "react";
import { makeStyles } from "@mui/styles";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackBar } from "../../redux/action/snackActions";

const Snack = (props) => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snack);

  const handleClose = () => {
    dispatch(hideSnackBar());
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity || "success"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
