import React from "react";
import { makeStyles } from "@mui/styles";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackBar } from "../../redux/action/snackActions";

const Snack = (props) => {
  const dispatch = useDispatch();
  const snack = useSelector((state) => state.snack);

  const handleClose = () => {
    dispatch(hideSnackBar());
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={4000}
      onClose={() => dispatch(hideSnackBar())}
      open={Boolean(snack.open)}
    >
      {snack.message ? (
        <Alert
          variant="filled"
          onClose={() => dispatch(hideSnackBar())}
          severity={snack.severity}
        >
          {snack.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};

export default Snack;
