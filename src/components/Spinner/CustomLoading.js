import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    height: "50%",
    width: "50%",
    objectFit: "contain",
  },
}));

const CustomLoading = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={"/images/loading.gif"} className={classes.gif} />
    </div>
  );
};

export default CustomLoading;
