import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  bgContainer: {
    position: "absolute",
    height: "100%",
    left: 0,
    zIndex: -1,
    top: 0,
    width: "100%",
  },

  bg: {
    background: theme.palette.primary.main,
    backgroundImage: "url(background/bg1.png)",
    backgroundSize: "cover",
    flex: 1,
    height: 180,
  },
  sectionBg: {
    position: "absolute",
    height: "100%",
    left: 0,
    zIndex: -1,
    top: 0,
    width: "100%",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: 'fixed',
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    minHeight: '100%'
  },
}));

const BackgroundImage = (props) => {
  const classes = useStyles();

  const { sectionBg } = useSelector((state) => state.user);
  return (
    <div
      className={classes.sectionBg}
      style={{
        backgroundImage: `url(${sectionBg})`,
      }}
    />
    // <div className={classes.bgContainer}>
    //   {/* <div className={classes.bg} /> */}

    // </div>
  );
};

export default BackgroundImage;
