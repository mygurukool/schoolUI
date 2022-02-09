import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFirebaseToken,
  onFirebaseMessageListener,
} from "../../firebase/firebaseInit";

import NotifIcon from "@mui/icons-material/Notifications";
import TimeIcon from "@mui/icons-material/AccessTime";

import {
  registerNotificationToken,
  setNotificationMessage,
} from "../../redux/action/utilActions";
import { makeStyles } from "@mui/styles";
import moment from "moment";

export const NotificationHandler = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.util);
  const [notificationToken, setNotificationToken] = React.useState();
  React.useEffect(() => {
    getFirebaseToken((token) => {
      setNotificationMessage(token);
      dispatch(registerNotificationToken(token));
    });
  }, []);
  onFirebaseMessageListener().then((payload) => {
    dispatch(setNotificationMessage(payload));
  });
  return <></>;
};

export const Notification = () => {
  const classes = useStyles();
  const { notifications } = useSelector((state) => state.util);
  const [anchorEl, setAnchorEl] = React.useState();

  const handleClose = () => {
    setAnchorEl();
  };

  const handleOpenMenu = (event) => {
    if (notifications?.length > 0) setAnchorEl(event.currentTarget);
  };

  const NotificationItem = ({ notification, data, ...props }) => {
    const { title, body, time } = notification;
    console.log("time");
    const notificationTime = moment().fromNow();

    return (
      <MenuItem>
        <Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: "inherit",
              minHeight: "inherit",
            }}
          >
            <Typography className={classes.menuTitle}>{title}</Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: "inherit",
              minHeight: "inherit",
            }}
          >
            <Typography variant="caption">{body}</Typography>
            &nbsp;
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <TimeIcon
              style={{ fontSize: 15, marginRight: 5 }}
              color="secondary"
            />
            <Typography variant="caption" color="secondary">
              {notificationTime}
            </Typography>
          </Box>
        </Box>
      </MenuItem>
    );
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        classes={{ paper: classes.menuPaper }}
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        getContentAnchorEl={null}
      >
        <div className={classes.menuContainer}>
          <Typography className={classes.title}>Notifications</Typography>
          <Typography className={classes.subTitle}>
            You have 2 notifications
          </Typography>
        </div>
        <Divider />
        {notifications?.map((n, ni) => {
          return <NotificationItem {...n} key={ni} />;
        })}
        <Box className={classes.btnContainer}>
          <Button variant="text" fullWidth color="primary">
            View More
          </Button>
        </Box>
      </Menu>
      <Badge badgeContent={notifications.length} color="primary">
        <IconButton onClick={handleOpenMenu}>
          <NotifIcon color="action" />
        </IconButton>
      </Badge>
    </>
  );
};

export default Notification;
const useStyles = makeStyles((theme) => ({
  menuPaper: {
    overflow: "visible",
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
    borderRadius: theme.palette.radius.medium,
    minWidth: 220,
    width: "auto",
  },
  menuContainer: {
    padding: "4px 20px 12px 20px",
  },
  btnContainer: {
    padding: "12px 20px 12px 20px",
  },
  menuTitle: {
    padding: "5px 0",
    fontSize: theme.palette.fontSizes.base,
    color: theme.palette.text.main,
    fontWeight: theme.palette.fontWeights.semiBold,
  },
}));
