import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandMore";
import ExpandMore from "@mui/icons-material/KeyboardArrowRight";
import { studentRoutes, teacherRoutes } from "../../routes/LeftSideBarRoutes";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/action/utilActions";

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiPaper-root": {
      // background: theme.palette.primary.light,
      borderTopRightRadius: theme.palette.radius.medium,
      borderBottomRightRadius: theme.palette.radius.medium,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  listText: {
    color: theme.palette.primary.main,
    fontWeight: theme.palette.fontWeights.semiBold,
    textTransform: "capitalize",
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  listSubText: {
    color: theme.palette.text.primary,
    fontWeight: theme.palette.fontWeights.regular,
  },
  listItem: {
    // padding: theme.spacing(1.5, 2.5, 1.5, 5),
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
}));

const Index = ({ open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState({});
  const handleExpandClick = (index) => {
    setExpanded({
      ...expanded,
      [index]: !expanded[index],
    });
  };
  const checkRoles = (role) => {
    switch (role) {
      case "student":
        return studentRoutes;
      case "teacher":
        return teacherRoutes;
      default:
        break;
    }
  };

  const handleOpenModal = (modalName) => {
    dispatch(openModal(modalName));
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      onEscapeKeyDown={onClose}
      onBackdropClick={onClose}
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography></Typography>
        <IconButton onClick={onClose} color="secondary">
          <CloseIcon />
        </IconButton>
      </div>
      <List>
        <Divider />
        {checkRoles("teacher").map((item, index) => (
          <>
            <ListItem
              className={classes.listItem}
              button
              key={index}
              onClick={() =>
                item.children
                  ? handleExpandClick(index)
                  : handleOpenModal(item.modalName)
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>
                <Typography class={classes.listText}>{item.title}</Typography>
              </ListItemText>
              {item?.children ? (
                expanded[index] ? (
                  <ExpandLess color="primary" />
                ) : (
                  <ExpandMore color="primary" />
                )
              ) : (
                ""
              )}
            </ListItem>

            {item.children && (
              <Collapse
                key={index}
                in={expanded[index]}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding>
                  {item.children.map((child) => (
                    <ListItem button>
                      <ListItemText inset>
                        <Typography class={classes.listSubText}>
                          {child.title}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </>
        ))}
      </List>
    </Drawer>
  );
};

export default Index;
