import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
}));

const ErrorDisplay = (props) => {
  const classes = useStyles();
  return <div className={classes.root}>an Error Occured</div>;
};

export default ErrorDisplay;
