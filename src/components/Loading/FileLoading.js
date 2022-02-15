import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: "20vh",
    width: "20vw",
    objectFit: "contain",
  },
}));

const FileLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src="/images/gifs/fileloading.gif" className={classes.img} />
      <Typography>Loading File</Typography>
    </div>
  );
};

export default FileLoading;
