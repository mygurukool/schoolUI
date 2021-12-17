import React from "react";
import { createStyles, makeStyles, Theme } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { Stack, Typography } from "@mui/material";
import DoubleCheckIcon from "@mui/icons-material/DoneAllTwoTone";
import CheckIcon from "@mui/icons-material/CheckTwoTone";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    message: {
      margin: theme.spacing(1, 0),
    },
    messageRow: {
      display: "flex",
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
    },
    messageLeft: {
      position: "relative",
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.secondary.light,
      maxWidth: theme.spacing(40),
      borderRadius: theme.palette.radius.medium,
      borderTopLeftRadius: 0,
    },
    messageRight: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.primary.light,
      borderRadius: theme.palette.radius.medium,
      borderTopRightRadius: 0,
      maxWidth: theme.spacing(40),
    },

    messageContent: {
      fontSize: theme.palette.fontSizes.base,
    },
    messagetimeRight: {
      fontWeight: theme.palette.fontWeights.medium,
    },

    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      background: theme.palette.secondary.main,
    },
    displayNameLeft: {
      fontSize: theme.palette.fontSizes.sm,
      fontWeight: theme.palette.fontWeights.medium,
      color: theme.palette.gray[1200],
      margin: theme.spacing(0, 1),
    },
    displayNameRight: {
      fontSize: theme.palette.fontSizes.sm,
      fontWeight: theme.palette.fontWeights.medium,
      color: theme.palette.gray[1200],
      margin: theme.spacing(0, 1),
      textAlign: "right",
    },
  })
);

export const MessageLeft = (props) => {
  const { text } = props.message;
  const time = props.time;
  const photoURL = props.photoURL;
  const displayName = props.displayName;
  const classes = useStyles();
  return (
    <>
      <div className={clsx(classes.messageRow, classes.message)}>
        {/* <Avatar alt={displayName} className={classes.avatar} src={photoURL}>
          {displayName.charAt(0)}
        </Avatar> */}
        <div>
          {/* <Typography className={classes.displayNameLeft}>
            {displayName}, {time} <CheckIcon fontSize="inherit" />
          </Typography> */}
          <div className={classes.messageLeft}>
            <Typography className={classes.messageContent}>{text}</Typography>
          </div>
        </div>
      </div>
    </>
  );
};
export const MessageRight = (props) => {
  const classes = useStyles();
  const { text } = props.message;

  const time = props.time ? props.time : "";
  return (
    <div className={classes.messageRowRight}>
      <div>
        <Typography className={classes.displayNameRight}>
          {time} <DoubleCheckIcon fontSize="inherit" />
        </Typography>
        <div className={classes.messageRight}>
          <Typography className={classes.messageContent}>{text}</Typography>
        </div>
      </div>
    </div>
  );
};

const MessageList = ({ messages, userId }) => {
  return (
    <Stack direction="column">
      {messages.map((m, i) => {
        const isSentByME = m.userId === userId;

        if (isSentByME) {
          return <MessageRight {...m} key={i} />;
        } else {
          return <MessageLeft {...m} key={i} />;
        }
      })}
    </Stack>
  );
};
export default MessageList;
