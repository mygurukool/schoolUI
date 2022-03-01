import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "50vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    height: 100,
    width: 100,
    objectFit: "contain",
  },
}));

const CustomLoading = (props) => {
  const classes = useStyles();
  const { currentGroup } = useSelector((state) => state.common);
  const getLoaderGif = () => {
    switch (currentGroup.ageGroupId) {
      case "1":
        return "preteen.gif";

      case "2":
        return "teen.gif";

      case "3":
        return "adult.gif";

      default:
        break;
    }
  };

  const loader = getLoaderGif();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      onClick={() => {}}
    >
      <div className={classes.root}>
        <img src={`images/${loader}`} className={classes.gif} />
      </div>
    </Backdrop>
  );
};

export default CustomLoading;
