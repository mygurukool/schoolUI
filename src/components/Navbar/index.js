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

import { makeStyles, styled } from "@mui/styles";
import { useHistory } from "react-router-dom";
// import languages from "../../utils/languages.json";
// import useLanguage from "../../hooks/useLanguage";
// import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "../Drawer";
import {
  InfoTwoTone as AboutIcon,
  ContactSupportTwoTone as ContactIcon,
  Event,
  HomeTwoTone,
} from "@mui/icons-material";
import clsx from "clsx";

export default function Navbar({ showBg, position, showBack, ...props }) {
  const classes = useStyles();

  // const [notiAnchorEl, setNotiAnchorEl] = React.useState(null);
  // const [open, setOpen] = React.useState(false);
  // const [notiOpen, setNotiOpen] = React.useState(false);
  // const { i18n } = useTranslation();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  // const translate = useLanguage()

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };
  // const handleLanguageClick = (event) => {
  //   setNotiAnchorEl(event.currentTarget);
  //   setNotiOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  //   setNotiOpen(false);
  //   setNotiAnchorEl(null);
  // };



  // const languageMenu = (
  //   <StyledMenu
  //     anchorEl={notiAnchorEl}
  //     open={notiOpen}
  //     onClose={handleClose}
  //     onClick={handleClose}
  //     classes={{ paper: classes.menuPaper }}
  //     PaperProps={{
  //       elevation: 0,
  //     }}
  //     transformOrigin={{ horizontal: "right", vertical: "top" }}
  //     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
  //     getContentAnchorEl={null}
  //   >
  //     {languages.map((lang, index) => {
  //       return (
  //         <MenuItem onClick={() => i18n.changeLanguage(lang.code)}>
  //           {/* <ListItemIcon>
  //                   <PersonIcon fontSize="small" />
  //               </ListItemIcon> */}
  //           <Typography className={classes.menuTitle}>{lang.name}</Typography>
  //         </MenuItem>
  //       );
  //     })}
  //   </StyledMenu>
  // );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        color={"transparent"}
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

            <Typography variant="h6" className={classes.appName}>
              <img
                src="images/logo.png"
                style={{ width: 80, height: 'auto', cursor: 'pointer' }}
                onClick={() => history.push('/')}
              />
            </Typography>

          </Box>


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
              <Divider />
              <ListItem
                button
                className={classes.listItem}
                onClick={() => { history.push('/'); handleDrawerToggle() }}
              >
                <ListItemIcon>
                  <HomeTwoTone />
                </ListItemIcon>

                <ListItemText primary="Home" />
              </ListItem>
              <Divider />
              <ListItem
                button
                className={classes.listItem}
                onClick={() => { history.push('/about'); handleDrawerToggle() }}
              >
                <ListItemIcon>
                  <AboutIcon />
                </ListItemIcon>

                <ListItemText primary="About" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => history.push('/contact')}
                // onClick={() => { window.location.href = "mailto:contact@mougli.school" }}
                className={classes.listItem}
              >
                <ListItemIcon>
                  <ContactIcon />
                </ListItemIcon>

                <ListItemText primary="Contact" />
              </ListItem>
              <Divider />
            </List>
          </Drawer>

          <ul className={classes.navList}>

            <li className={classes.hideNav}>
              <div className="guideBtn">
                <Button
                  color="inherit"
                  variant="text"
                  onClick={() => history.push('/')}
                  className={clsx(classes.navLink, classes.active)}
                >
                  Home
                </Button>
              </div>
            </li>
            <li className={classes.hideNav}>
              <Button
                color="inherit"
                variant="text"
                onClick={() => history.push('/about')}
                className={classes.navLink}
              >
                About
              </Button>
            </li>
            <li className={classes.hideNav}>
              <Button
                color="inherit"
                variant="text"
                onClick={() => history.push('/contact')}
                // onClick={() => { window.location.href = "mailto:contact@mougli.school" }}

                className={classes.navLink}
              >
                Contact
              </Button>
            </li>
            {/* <li>
              <AppButton
                variant="text"
                color="inherit"
                onClick={handleLanguageClick}
              >
                {translate("LANGUAGE")}
              </AppButton>
            </li>
            <li>
              <AppButton
                variant="contained"
                color="black"
              >
                Login
              </AppButton>
            </li> */}
            {/* {languageMenu} */}
            {/* {notificationMenu} */}
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

    [theme.breakpoints.up("xs")]: {
      padding: theme.spacing(2, 0.5, 0, 0.5),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3, 2, 0, 2),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3, 4, 0, 4),
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(3, 7, 0, 7),
    },
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
    textTransform: "capitalize",
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
