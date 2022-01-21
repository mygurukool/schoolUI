import * as React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  ListItemIcon,
  Box,
  AppBar,
  Avatar,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/ExitToApp";
// import NotificationsIcon from '@mui/icons-material/NotificationsTwoTone'
// import PersonIcon from '@mui/icons-material/PersonOutlineTwoTone';
// import Settings from '@mui/icons-material/SettingsTwoTone';
// import TimeIcon from '@mui/icons-material/AccessTimeTwoTone';
import { makeStyles, styled } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/action/userActions";
import { useHistory } from "react-router-dom";
import languages from "../../utils/languages.json";
import lang from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import Drawer from "../Drawer";
import { ArrowBack, ArrowRight } from "@mui/icons-material";

export default function NavBar({ showBg, position, showBack, ...props }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notiAnchorEl, setNotiAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [notiOpen, setNotiOpen] = React.useState(false);
  const { i18n } = useTranslation();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  // const handleNotiClick = (event) => {
  //     setNotiAnchorEl(event.currentTarget);
  //     setNotiOpen(true)
  // }
  const handleLanguageClick = (event) => {
    setNotiAnchorEl(event.currentTarget);
    setNotiOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNotiOpen(false);
    setAnchorEl(null);
    setNotiAnchorEl(null);
  };
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/login");
  };

  const accountMenu = (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
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
      <Box className={classes.menuContainer}>
        <Avatar
          src={user?.imageUrl && user?.imageUrl}
          style={{ marginRight: 10 }}
        >
          {user?.name ? <img src={user?.imageUrl} /> : user?.name?.charAt(0)}
        </Avatar>
        <div>
          <Typography variant="subtitle1">{user?.name || ""}</Typography>
          <Typography variant="subtitle2" className={classes.subTitle}>
            {user?.email || ""}
          </Typography>
        </div>
      </Box>
      <Divider />
      {/* <MenuItem>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                <Typography className={classes.menuTitle}>Profile</Typography>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                <Typography className={classes.menuTitle}>Settings</Typography>
            </MenuItem> */}
      <Box className={classes.btnContainer}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleLogout()}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </StyledMenu>
  );

  const languageMenu = (
    <StyledMenu
      anchorEl={notiAnchorEl}
      open={notiOpen}
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
      {languages.map((lang, index) => {
        return (
          <MenuItem onClick={() => i18n.changeLanguage(lang.code)}>
            {/* <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon> */}
            <Typography className={classes.menuTitle}>{lang.name}</Typography>
          </MenuItem>
        );
      })}
    </StyledMenu>
  );

  // const notificationMenu = (
  //     <Menu
  //         anchorEl={notiAnchorEl}
  //         open={notiOpen}
  //         onClose={handleClose}
  //         onClick={handleClose}
  //         classes={{ paper: classes.menuPaper }}
  //         PaperProps={{
  //             elevation: 0,
  //         }}
  //         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
  //         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  //         getContentAnchorEl={null}
  //     >
  //         <div className={classes.menuContainer}>
  //             <Typography className={classes.title}>
  //                 Notifications
  //             </Typography>
  //             <Typography className={classes.subTitle}>
  //                 You have 2 notifications
  //             </Typography>
  //         </div>
  //         <Divider />
  //         <MenuItem>
  //             <Box>
  //                 <Box style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 'inherit', minHeight: 'inherit' }}>
  //                     <Typography className={classes.menuTitle}>New Subscription</Typography>&nbsp;
  //                     <Typography className={classes.subTitle}>New Subscription Subscription Subscription</Typography>
  //                 </Box>
  //                 <Box style={{ display: 'flex', alignItems: 'center' }}>
  //                     <TimeIcon style={{ fontSize: 15, marginRight: 5 }} color="secondary" />
  //                     <Typography variant="caption" color="secondary">About 2 min ago</Typography>
  //                 </Box>
  //             </Box>
  //         </MenuItem>
  //         <Box className={classes.btnContainer}>
  //             <Button variant="text" fullWidth color="primary">View More</Button>
  //         </Box>
  //     </Menu>
  // );

  return (
    <>
      <AppBar
        position={position || "static"}
        color={showBg ? "primary" : "transparent"}
        elevation="0"
        className={classes.AppBar}
        {...props}
      >
        <Toolbar variant="dense">
          {/* <IconButton onClick={handleDrawerOpen} edge="start" size="small">
            <MenuIcon />
          </IconButton> */}
          {showBack && (
            <IconButton onClick={() => history.goBack()}>
              <ArrowBack />
            </IconButton>
          )}

          <Box
            style={{
              flex: 3,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {/* <img src="images/mygurukool.svg" style={{ width: 40, height: 40, marginRight: 10 }} /> */}
            <Typography variant="h6" className={classes.appName}>
              My Gurukool (BETA)
            </Typography>
          </Box>
          {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                        <MailIcon />
                        </Badge>
                    </IconButton> */}
          {/* <IconButton
                        size="medium"
                        variant="contained"
                        aria-label="show 17 new notifications"
                        onClick={handleNotiClick}
                    >
                        <Badge badgeContent={17} color="primary">
                        <NotificationsIcon fontSize="inherit" />
                        </Badge>
                    </IconButton> */}
          <ul className={classes.navList}>
            <li>
              <Button size="large">
                <Typography className={classes.navLink}>
                  {lang("home")}
                </Typography>
              </Button>
            </li>
            <li>
              <Button size="large">
                <Typography className={classes.navLink}>
                  {lang("about")}
                </Typography>
              </Button>
            </li>
            <li>
              <Button size="large">
                <Typography className={classes.navLink}>
                  {lang("contact")}
                </Typography>
              </Button>
            </li>
            <li>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={handleLanguageClick}
              >
                <Typography className={classes.navLink}>
                  {lang("language")}
                </Typography>
              </Button>
            </li>
            <li>
              {user?.isLogged && (
                <IconButton onClick={handleClick} size="small">
                  <Avatar
                    src={user?.imageUrl && user?.imageUrl}
                    className={classes.avatar}
                  >
                    {user?.name ? (
                      <img src={user?.imageUrl} />
                    ) : (
                      user?.name?.charAt(0)
                    )}
                  </Avatar>
                </IconButton>
              )}
              {accountMenu}
              {languageMenu}
              {/* {notificationMenu} */}
            </li>
          </ul>
        </Toolbar>
      </AppBar>
      <Drawer open={openDrawer} onClose={handleDrawerClose} />
    </>
  );
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  AppBar: {
    width: "100%",
    background: "transparent",
  },
  // toolBar: {
  //   display: 'flex',
  //   width: '100%',
  //   justifyContent: 'center',
  //   padding: 0,
  //   "& .MuiButtonBase-root": {
  //     margin: '0 5px'
  //   }
  // },
  appName: {
    textTransform: "uppercase",
    fontWeight: theme.palette.fontWeights.regular,
    color: theme.palette.text.primary,
  },
  title: {
    fontSize: theme.palette.fontSizes.base,
    fontWeight: theme.palette.fontWeights.semiBold,
    textTransform: "capitalize",
  },
  subTitle: {
    color: theme.palette.gray[1200],
  },
  menuPaper: {
    overflow: "visible",
    boxShadow:
      "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px",
    borderRadius: theme.palette.radius.medium,
    minWidth: 220,
    width: "auto",
  },
  menuContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 20px 12px 20px",
  },
  btnContainer: {
    padding: "12px 20px 12px 20px",
  },
  menuTitle: {
    padding: "5px 0",
    fontSize: theme.palette.fontSizes.base,
    color: theme.palette.text.main,
    fontWeight: theme.palette.fontWeights.regular,
  },
  navList: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    listStyleType: "none",
    alignItems: "center",
    flex: 1.5,
    "& li": {
      padding: theme.spacing(0.5),
      "& .MuiButton-root": {
        color: theme.palette.text.primary,
      },
    },
  },
  navLink: {
    textTransform: "capitalize",
    fontSize: theme.palette.fontSizes.base,
    fontWeight: theme.palette.fontWeights.medium,
  },
  avatar: {
    background: theme.palette.secondary.main,
    textTransform: "capitalize",
  },
  menuButton: {
    color: "white",
    marginRight: theme.spacing(2),
  },
}));
