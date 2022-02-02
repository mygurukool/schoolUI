import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { DUEDATETIMEFORMAT, DUEDATECOLORS, DATETIMEFORMAT } from "../../constants";

const DueDateTime = ({ dueDateTime, currentDiffrence }) => {
  const isExpired =
    currentDiffrence > 0
      ? `${currentDiffrence} Days Remaining`
      : `This assignment is expired`;

  const chipColor = () => {
    const found = DUEDATECOLORS.find((d) => currentDiffrence <= d.days);

    if (found) {
      return found.color;
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)',
      marginRight: theme.spacing(1),
      borderRadius: theme.palette.radius.base,
      // padding: theme.spacing(0.5, 1),
    },
    innerBox: {
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    dateBox: {
      padding: theme.spacing(0, 0.5),
      textAlign: 'center',
      background: theme.palette.secondary.main,
      borderTopLeftRadius: theme.palette.radius.small,
      borderTopRightRadius: theme.palette.radius.small,
      width: "100%",
    },
    timeBox: {
      width: "100%",
      padding: theme.spacing(0, 0.5),
      textAlign: 'center',
      border: `1px solid ${theme.palette.secondary.main}`,
      borderBottomLeftRadius: theme.palette.radius.small,
      borderBottomRightRadius: theme.palette.radius.small,
    }
  }));

  const classes = useStyles();
  return (
    <Tooltip title={isExpired} arrow>
      <Box className={classes.root}>
        <Box className={classes.innerBox}>
          <Box className={classes.dateBox}>
            <Typography variant="caption" style={{ fontWeight: 600 }} color="white"> {moment(dueDateTime, DATETIMEFORMAT).format('DD, MMM')}</Typography>
          </Box>
          <Box className={classes.timeBox}>
            <Typography variant="caption" style={{ fontWeight: 600 }} color="secondary">{currentDiffrence}&nbsp;days</Typography>
          </Box>
        </Box>
      </Box >
    </Tooltip >
  );
};

export default DueDateTime;


// import React from "react";
// import { makeStyles } from "@mui/styles";
// import { Chip, Stack, Tooltip, Typography } from "@mui/material";
// import moment from "moment";
// import { DUEDATETIMEFORMAT, DUEDATECOLORS } from "../../constants";

// const DueDateTime = ({ dueDateTime, currentDiffrence }) => {
//   const isExpired =
//     currentDiffrence > 0
//       ? `${currentDiffrence} Days Remaining`
//       : `This assignment is expired`;

//   const chipColor = () => {
//     const found = DUEDATECOLORS.find((d) => currentDiffrence <= d.days);

//     if (found) {
//       return found.color;
//     }
//   };

//   const useStyles = makeStyles((theme) => ({
//     root: {},
//     daysContainer: {
//       borderRadius: 100,
//       backgroundColor: theme.palette.secondary.main,

//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       flexDirection: "row",
//       padding: theme.spacing(0.5, 1),
//     },
//     days: {
//       color: theme.palette.white,
//     },
//     chipRoot: {
//       border: "1px solid red",
//       color: `white`,
//       //   "& .MuiChip-root": {
//       //     backgroundColor: "red",
//       //   },
//     },
//     filled: {
//       backgroundColor: `${chipColor} !important`,

//       // border: `1px solid ${chipColor()} !important`,
//     },
//     outlined: {
//       // border: `1px solid ${chipColor()} !important`,
//     },
//   }));

//   const classes = useStyles();

//   return (
//     <Stack direction="row" spacing={2} alignItems="center">
//       <Tooltip title={isExpired} arrow>
//         <Chip
//           label={dueDateTime}
//           size="small"
//           variant="filled"
//           classes={{
//             root: classes.chipRoot,
//             outlined: classes.outlined,
//             filled: classes.filled,
//           }}
//         />
//       </Tooltip>
//       <Chip
//         label={`${currentDiffrence} days`}
//         variant="filled"
//         color="secondary"
//         size="small"
//         classes={{
//           label: classes.days,
//         }}
//       />
//     </Stack>
//   );
// };

// export default DueDateTime;
