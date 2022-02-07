import React from "react";
import { makeStyles } from "@mui/styles";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Whiteboard from "../../assets/icons/Whiteboard";

import CalendarIcon from "@mui/icons-material/EventNote";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/action/utilActions";

const Component = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <nav className={classes.root}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Whiteboard color="black" />
            </ListItemIcon>
            <ListItemText
              className={classes.listText}
              primaryTypographyProps={{
                variant: "subtitle2",
              }}
              primary="White Board"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Whiteboard color="black" />
            </ListItemIcon>
            <ListItemText
              className={classes.listText}
              primaryTypographyProps={{
                variant: "subtitle2",
              }}
              primary="Conference"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch({ type: "TOGGLE_BUTTON" })}>
            <ListItemIcon>
              <Whiteboard color="black" />
            </ListItemIcon>
            <ListItemText
              className={classes.listText}
              primaryTypographyProps={{
                variant: "subtitle2",
              }}
              primary="Enable WB & Conf."
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch(openModal("calendar"))}>
            <ListItemIcon>
              <CalendarIcon color="black" />
            </ListItemIcon>
            <ListItemText
              className={classes.listText}
              primaryTypographyProps={{
                variant: "subtitle2",
              }}
              primary="Calendar"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
};

export default Component;

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.white,
    borderRadius: theme.palette.radius.medium,
    boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.2)",
    position: "absolute",
    padding: theme.spacing(0, 1),
    // margin: 'auto',
    top: 60,
    bottom: "0",
    height: "80%",
    left: 20,
    width: 70,
    overflow: "hidden",
    WebkitTransition: "width .1s ease",
    transition: "width .1s ease",
    WebkitTransform: "translateZ(0) scale(1,1)",
    zIndex: 1000,
    cursor: "pointer",
    "&:hover": {
      width: 250,
      overflow: "visible",
    },
  },
  listText: {
    whiteSpace: "nowrap",
  },
}));
