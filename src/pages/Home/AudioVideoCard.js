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
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/action/utilActions";

const useStyles = makeStyles((theme) => ({
  title: {
    width: '100%',
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    textAlign: 'left',
    overflow: "hidden",
    textOverflow: "ellipsis",
  }
}));

const AudioVideoCard = ({ onClick, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const title = getTitle(props);
  const image = getImage(props);

  const handleClick = () => {
    if (props.type === "youtube") {
      dispatch(openModal("youtube", props.metaData));
    }

    if (props.type === "link") {
      window.open(props.metaData.ogUrl, "_blank");
    }
  };

  return (
    <Grid item lg={props.size} onClick={handleClick} className="audioVideo">
      <ButtonBase onClick={onClick} sx={{ width: "100%" }}>
        <Card sx={{ display: 'flex', width: "100%" }} elevation={0} variant="outlined">
          {image && <CardMedia
            component="img"
            sx={{ width: { xs: 75, sm: 100 }, height: 60, }}
            image={image}
            alt={title}
          />}
          <CardContent>
            <Typography variant="body1" className={classes.title}>{title}</Typography>
          </CardContent>
        </Card>
        {/* <Card className={classes.root} elevation={0}>
          <CardMedia className={classes.img} image={image} title={title} />
          <CardContent className={classes.content}>
            <Typography variant="subtitle2" style={{ textAlign: "left" }}>{title}</Typography>
          </CardContent>
        </Card> */}
      </ButtonBase>
    </Grid>
  );
};

export default AudioVideoCard;
const getImage = (a) => {
  switch (a.type) {
    case "youtube":
      return a.metaData.thumbnail_url;
    case "link":
      return a?.metaData?.ogImage?.url || '/images/link.png';

      break;

    default:
      break;
  }
};

const getTitle = (a) => {
  switch (a.type) {
    case "youtube":
      return a.metaData.title;

    case "link":
      return a.metaData.ogTitle;

    default:
      break;
  }
};
