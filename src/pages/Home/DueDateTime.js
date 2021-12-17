import React from "react";
import { makeStyles } from "@mui/styles";
import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { DUEDATETIMEFORMAT, DUEDATECOLORS } from "../../constants";

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
    root: {},
    daysContainer: {
      borderRadius: 100,
      backgroundColor: theme.palette.secondary.main,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      padding: theme.spacing(0.5, 1),
    },
    days: {
      color: theme.palette.white,
    },
    chipRoot: {
      border: "1px solid red",
      color: `white`,
      //   "& .MuiChip-root": {
      //     backgroundColor: "red",
      //   },
    },
    filled: {
      backgroundColor: `${chipColor} !important`,

      // border: `1px solid ${chipColor()} !important`,
    },
    outlined: {
      // border: `1px solid ${chipColor()} !important`,
    },
  }));

  const classes = useStyles();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Tooltip title={isExpired} arrow>
        <Chip
          label={dueDateTime}
          size="small"
          variant="filled"
          classes={{
            root: classes.chipRoot,
            outlined: classes.outlined,
            filled: classes.filled,
          }}
        />
      </Tooltip>
      <Chip
        label={`${currentDiffrence} days`}
        variant="filled"
        color="secondary"
        size="small"
        classes={{
          label: classes.days,
        }}
      />
    </Stack>
  );
};

export default DueDateTime;
