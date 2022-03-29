import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  shape: {
    borderRadius: 4,
  },
  palette: {
    // type: "dark",
    white: "#fff",
    black: "#000",
    background: {
      light: "#ffee80",
      main: "#f7e677",
      primary: "#FEE440",
      dark: "#212121",
      // paper: "#3B3B3B",
    },
    text: {
      primary: "#0A033C",
      inverted: "#637381",
    },
    gray: {
      100: "#f9f9f9",
      200: "#F7F7F7",
      300: "#f4f4f4",
      400: "#F3F3F3",
      500: "#f1f1f1", // border alt color
      600: "#EdEdEd",
      700: "#E6E6E6", // border color
      800: "#C2C3CC",
      900: "#bdbdbd",
      1000: "#ababab",
      1100: "#9e9e9e",
      1200: "#919191",
    },
    textField: {
      main: "#E7EBFD",
    },
    // primary: {
    //   main: "#1f5f61",
    // },
    // primary: {
    //   main: "#51C3FE",
    //   light: "#e8e6f2",
    //   contrastText: "#fff",

    // },
    primary: {
      main: "#EBA049",
      light: "#FFFBF6",
      contrastText: "#fff",
    },
    secondary: {
      main: "#D2565B",
      light: "#FDF5F3",
      contrastText: "#fff",
    },
    neutral: {
      main: "#d6a936",
      light: "#fce9b3",
      contrastText: "#fff",
    },
    black: {
      main: "#212121",
      contrastText: "#fff",
    },
    blue: {
      main: "#2c8bc7",
    },
    green: {
      main: "#00A257",
    },
    success: {
      main: "#2ac77e",
      contrastText: "#ffffff",
    },
    orange: {
      main: "#fc9f42",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f55361",
      light: "#f55361",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FECA68",
      light: "#FECA68",
      contrastText: "#212121",
    },
    info: {
      main: "#308bbf",
      light: "#308bbf",
      contrastText: "#212121",
    },
    fontSizes: {
      xs: 11,
      sm: 13,
      base: 15,
      semibase: 17,
      md: 19,
      lg: 21,
      xl: 24,
      xxl: 30,
      "2xl": 30,
      "3xl": 36,
      "4xl": 42,
      "5xl": 48,
      "6xl": 54,
      "7xl": 60,
    },
    fontWeights: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      bolder: 900,
    },
    radius: {
      base: "8px",
      small: "5px",
      medium: "12px",
      big: "20px",
      bigger: "50px",
    },
    // blue: {
    //   main: blue[100],
    // },

    // green: {
    //   main: green,
    // },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },

  //   grayBackground: "#f7f7f7",

  //   secondary: {
  //     main: "#D31D24",
  //   },

  //   text: {
  //     // primary: "#fff",
  //     // secondary: "#fff",
  //   },
  //   divider: "rgba(255, 255, 255, 0.12)",

  // },
  // typography: {
  //   // In Chinese and Japanese the characters are usually larger,
  //   // so a smaller fontsize may be appropriate.
  //   primary: "red",
  //   fontSize: 12,
  // },
});

theme = createTheme(theme, {
  components: {
    MuiTypography: {
      styleOverrides: {
        h6: {
          [theme.breakpoints.up('xs')]: {
            fontSize: theme.palette.fontSizes.base
          },
          [theme.breakpoints.up('sm')]: {
            fontSize: theme.palette.fontSizes.semibase
          },
          [theme.breakpoints.up('md')]: {
            fontSize: theme.palette.fontSizes.md
          },
          [theme.breakpoints.up('lg')]: {
            fontSize: theme.palette.fontSizes.lg
          },
        },
        h4: {
          [theme.breakpoints.up('xs')]: {
            fontSize: theme.palette.fontSizes.md
          },
          [theme.breakpoints.up('sm')]: {
            fontSize: theme.palette.fontSizes.lg
          },
          [theme.breakpoints.up('md')]: {
            fontSize: theme.palette.fontSizes.xl
          },
          [theme.breakpoints.up('lg')]: {
            fontSize: theme.palette.fontSizes.xxl
          },
        },
        subtitle1: {
          [theme.breakpoints.up('xs')]: {
            fontSize: theme.palette.fontSizes.sm
          },
          [theme.breakpoints.up('sm')]: {
            fontSize: theme.palette.fontSizes.base
          },
        },
        body1: {
          [theme.breakpoints.up('xs')]: {
            fontSize: theme.palette.fontSizes.sm
          },
          [theme.breakpoints.up('sm')]: {
            fontSize: theme.palette.fontSizes.sm
          },
        },
      },
    },


    MuiMenuItem: {
      styleOverrides: {
        root: {
          "& .MuiListItemIcon-root": {
            minWidth: "2rem",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: theme.palette.fontWeights.medium,
          textTransform: "capitalize",
          transition: "all 0.3s ease 0s",
          "&:hover": {
            // boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
            transform: "translateY(-3px)",
          },
        },
        text: {
          "&:hover": {
            boxShadow: "none",
            transform: "translateY(-3px)",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0.5),
          borderRadius: theme.palette.radius.base,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          width: '100%',
          color: theme.palette.black,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiDialog-paper": {
            borderRadius: theme.palette.radius.base,
          },
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        color: "black",
      },
      styleOverrides: {
        root: {
          borderRadius: theme.palette.radius.small,
          borderTopLeftRadius: theme.palette.radius.small,
          borderTopRightRadius: theme.palette.radius.small,
          // "&.Mui-focused": {
          //   borderColor: theme.palette.success.main,
          // },
          // '&:hover': {
          //   backgroundColor: theme.palette.textField.main,
          // },
        },
      },
    },
    MuiFormLabel: {
      defaultProps: {
        color: "black",
      },
    },
  },
});

// theme.props = {
// MuiButton: {
//   disableElevation: true,
//   size: "medium",
// },
//   MuiFilledInput: {
//     disableUnderline: true,
//   },
// };
// theme.overrides = {
// MuiMenuItem: {
//   root: {
//     "& .MuiListItemIcon-root": {
//       minWidth: "2rem",
//     },
//   },
// },
// MuiButton: {
//   root: {
//     fontWeight: theme.palette.fontWeights.bold,
//     textTransform: "capitalize",
//     borderRadius: theme.palette.radius.base,
//   },
// },
// MuiDialog: {
//   root: {
//     "& .MuiDialog-paper": {
//       borderRadius: theme.palette.radius.medium,
//     },
//   },
// },
// MuiOutlinedInput: {
//   root: {
//     borderRadius: theme.palette.radius.base,
//     borderTopLeftRadius: theme.palette.radius.base,
//     borderTopRightRadius: theme.palette.radius.base,
//     // "&.Mui-focused": {
//     //     backgroundColor: theme.palette.textField.main,
//     // },
//     // '&:hover': {
//     //     backgroundColor: theme.palette.textField.main,
//     // },
//   },
// },
// };
theme = responsiveFontSizes(theme);
export default theme;
