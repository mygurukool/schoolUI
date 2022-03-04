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
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";

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
import {
  ArrowBack,
  ArrowRight,
  ContactSupportTwoTone,
  Event,
  Home,
  HomeTwoTone,
  Info,
  InfoTwoTone,
  Tour,
} from "@mui/icons-material";
import { openModal, toggleGuide } from "../../redux/action/utilActions";
import AppButton from "../AppButton";

export default function NavBar({ showBg, position, showBack, ...props }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { isGoogleLogin, isMircrosoftLogin } = useSelector(
    (state) => state.user
  );

  const [notiAnchorEl, setNotiAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [notiOpen, setNotiOpen] = React.useState(false);
  const { i18n } = useTranslation();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
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
          sx={{
            width: { xs: 30, sm: 40 },
            height: { xs: 30, sm: 40 },
            mr: 1.5,
            bgcolor: "primary.main",
          }}
          className={classes.avatar}
        >
          {user?.name && user?.name?.charAt(0)}
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
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <AppBar
        position={position || "static"}
        color={showBg ? "primary" : "transparent"}
        elevation="0"
        className={classes.AppBar}
        {...props}
      >
        <Toolbar
          variant="dense"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <IconButton onClick={handleDrawerOpen} edge="start" size="small">
            <MenuIcon />
          </IconButton> */}
          {showBack && (
            <IconButton onClick={() => history.goBack()}>
              <ArrowBack />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {isGoogleLogin && (
              <>
                <img
                  src="images/gc.svg"
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <Typography variant="h6" className={classes.appName}>
                  Google Classroom
                </Typography>
              </>
            )}
            {/* <img src="images/mygurukool.svg" style={{ width: 40, height: 40, marginRight: 10 }} /> */}

            {/* microsoft login not implented  */}

            {!(isGoogleLogin || isMircrosoftLogin) && (
              <Typography variant="h6" className={classes.appName}>
                {user?.organization?.organizationName || "My Gurukool (BETA)"}
              </Typography>
            )}
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

          <Drawer
            container={container}
            variant="temporary"
            open={openDrawer}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <List>
              {/* <Divider />
              <ListItem button className={classes.listItem}>
                <ListItemIcon><HomeTwoTone /></ListItemIcon>
                <ListItemText primary={lang("HOME")} />
              </ListItem>
              <Divider />
              <ListItem button className={classes.listItem}>
                <ListItemIcon><InfoTwoTone /></ListItemIcon>

                <ListItemText primary={lang("ABOUT")} />
              </ListItem>
              <Divider />
              <ListItem button className={classes.listItem}>
                <ListItemIcon><ContactSupportTwoTone /></ListItemIcon>

                <ListItemText primary={lang("CONTACT")} />
              </ListItem> */}
              <Divider />
              <ListItem
                button
                onClick={() => dispatch(toggleGuide())}
                className={classes.listItem}
              >
                <ListItemIcon>
                  <Tour />
                </ListItemIcon>

                <ListItemText primary="Guide" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => dispatch(openModal("calendar"))}
                className={classes.listItem}
              >
                <ListItemIcon>
                  <Event />
                </ListItemIcon>

                <ListItemText primary="Calendar" />
              </ListItem>
              <Divider />
            </List>
          </Drawer>

          <ul className={classes.navList}>
            {/* <li className={classes.hideNav}>
              <Typography variant="subtitle1" className={classes.navLink}>
                {lang("HOME")}
              </Typography>
            </li>
            <li className={classes.hideNav}>
              <Typography variant="subtitle1" className={classes.navLink}>
                {lang("ABOUT")}
              </Typography>
            </li>
            <li className={classes.hideNav}>
              <Typography variant="subtitle1" className={classes.navLink}>
                {lang("CONTACT")}
              </Typography>
            </li> */}
            <li className={classes.hideNav}>
              <div className="guideBtn">
                <Button
                  startIcon={<Tour />}
                  color="secondary"
                  variant="text"
                  onClick={() => dispatch(toggleGuide())}
                  className={classes.navLink}
                >
                  Guide
                </Button>
              </div>
            </li>
            <li className={classes.hideNav}>
              <Button
                startIcon={<Event />}
                color="secondary"
                variant="text"
                onClick={() => dispatch(openModal("calendar"))}
                className={classes.navLink}
              >
                Calendar
              </Button>
            </li>
            <li>
              <AppButton
                variant="text"
                color="secondary"
                startIcon={<TranslateTwoToneIcon />}
                onClick={handleLanguageClick}
              >
                {lang("LANGUAGE")}
              </AppButton>
            </li>
            <li>
              {user?.isLogged && (
                <IconButton onClick={handleClick} size="small">
                  <Avatar
                    src={user?.imageUrl && user?.imageUrl}
                    className={classes.avatar}
                    sx={{
                      width: { xs: 30, sm: 40 },
                      height: { xs: 30, sm: 40 },
                      bgcolor: "primary.main",
                    }}
                  >
                    {user?.name && user?.name?.charAt(0)}
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
  listItem: {
    // padding: theme.spacing(1.5, 2.5, 1.5, 5),
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  hideNav: {
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
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
    whiteSpace: "nowrap",
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
    justifyContent: "flex-end",
    listStyleType: "none",
    alignItems: "center",
    "& li": {
      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(2),
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(0),
      },
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2),
      },
    },
  },
  navLink: {
    textTransform: "capitalize",
    cursor: "pointer",
    transition: "all 0.3s ease 0s",
    "&:hover": {
      transform: "translateY(-3px)",
    },
  },
  avatar: {
    background: theme.palette.secondary.main,
    textTransform: "capitalize",
    [theme.breakpoints.up("xs")]: {
      width: 24,
      height: 24,
    },
  },
  menuButton: {
    color: "white",
    marginRight: theme.spacing(2),
  },
}));
