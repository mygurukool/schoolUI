import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, Grid, Icon, IconButton } from "@mui/material";
import YouTube from "@mui/icons-material/YouTube";
import Drive from "@mui/icons-material/AddToDrive";

const useStyles = makeStyles((theme) => ({
  root: {},
  YouTube: {
    color: "red",
  },
  Drive: {
    color: "darkyellow",
  },
}));

const CourseMaterialList = ({ materials }) => {
  const classes = useStyles();
  return materials.map((m, i) => <MaterialItem key={i} {...m} />);
};

export default CourseMaterialList;

const MaterialItem = (props) => {
  const classes = useStyles();

  const isYoutubeVideo = props.youtubeVideo;
  const isDriveFile = props.youtubeVideo;

  return (
    <Grid item lg={2}>
      {isYoutubeVideo && (
        <IconButton>
          <YouTube className={classes.YouTube} />
        </IconButton>
      )}
      {isDriveFile && (
        <IconButton>
          <Drive className={classes.Drive} />
        </IconButton>
      )}
    </Grid>
  );
};
