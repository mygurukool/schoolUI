import React from "react";
import { makeStyles } from "@mui/styles";
import {
  ButtonBase,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  img: {
    height: 100,
    width: 150,
    objectFit: "contain",
  },
}));

const Videocard = ({ onClick, title, ...props }) => {
  const classes = useStyles();
  return (
    <Grid item lg={props.size}>
      <ButtonBase onClick={onClick}>
        <Card className={classes.root} elevation={0}>
          <CardMedia
            className={classes.img}
            image={props.thumbnailUrl}
            title="Live from space album cover"
          />
          <CardContent className={classes.content}>
            <Typography variant="subtitle2">{title}</Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    </Grid>
  );
};

export default Videocard;
