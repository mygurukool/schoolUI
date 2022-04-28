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
    backgroundImage: "url(/background/bg1.png)",
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
    [theme.breakpoints.up('xs')]: {
      backgroundSize: "cover",
    },
    [theme.breakpoints.up('sm')]: {
      backgroundSize: "100% 100%",
    },
    backgroundRepeat: "no-repeat",
    backgroundAttachment: 'fixed',
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    minHeight: '100%'
  },
  layer1: {
    width: '15%',
    position: 'absolute',
    bottom: 20,
    right: 0,
    zIndex: -1,
    [theme.breakpoints.up('xs')]: {
      width: '30%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '15%',
    },
  },
  shadow: {
    width: '100%',
    height: 3,
    background: 'rgba(0,0,0,0.5)',
    filter: 'blur(10px)'
  },
  clouds: {
    top: 50,
    width: '100%',
    position: "absolute",
    zIndex: -1,
  },
}));

const BackgroundImage = (props) => {
  const classes = useStyles();

  const { sectionBg } = useSelector((state) => state.user);
  return (
    <>
      <div
        className={classes.sectionBg}
        style={{
          backgroundImage: `url(${sectionBg})`,
        }}
      />
      <div>
        <div className={classes.clouds}>
          <img className="cloud1" src="/images/cloud1.svg" />
          <img className="cloud2" src="/images/cloud2.svg" />
          <img className="cloud3" src="/images/cloud3.svg" />
          <img className="cloud4" src="/images/cloud4.svg" />
          <img className="cloud5" src="/images/cloud5.svg" />
          <img className="cloud6" src="/images/cloud6.svg" />
        </div>
        <div className={classes.layer1}>
          <img src="/images/Layer2.svg" />
          <div className={classes.shadow}></div>
        </div>
      </div>
    </>
    // <div className={classes.bgContainer}>
    //   {/* <div className={classes.bg} /> */}

    // </div>
  );
};

export default BackgroundImage;
