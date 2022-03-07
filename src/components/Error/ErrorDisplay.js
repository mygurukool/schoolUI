import React from "react";
import { makeStyles } from "@mui/styles";
import useLanguages from "../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
}));

const ErrorDisplay = (props) => {
  const classes = useStyles();
  const translate = useLanguages()
  return <div className={classes.root}>{translate("AN_ERROR_OCCURED")}</div>;
};

export default ErrorDisplay;
