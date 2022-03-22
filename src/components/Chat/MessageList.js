import React from "react";
import { createStyles, makeStyles, Theme } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import clsx from "clsx";
import moment from "moment";
import { DATETIMEFORMAT } from "../../constants";

import ReplyIcon from "@mui/icons-material/Reply";
import ForwardIcon from "@mui/icons-material/Forward";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  myRoot: {
    flexDirection: "row-reverse",
  },
  msgContainer: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.gray[500],
    // maxWidth: "90%",
    // minWidth: "30%",
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  myMsgBoxContainer: {
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
  },
  replyMessageContainer: {
    background: "rgba(255,255,255,0.5)",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.palette.radius.base,
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
  },
  myText: {
    color: theme.palette.gray[900],
  },
}));

const MessageDisplay = ({ isSentByMe, message, onMenuClick, reply }) => {
  const classes = useStyles();
  const messageTime = moment(message.timeStamp).fromNow();
  return (
    <div className={clsx(classes.root, isSentByMe && classes.myRoot)}>
      <div>
        {!isSentByMe && (
          <Typography variant="caption">{message.senderName}</Typography>
        )}
        <Typography variant="caption">{messageTime}</Typography>
        <IconButton
          size="small"
          onClick={(e) =>
            onMenuClick(e, { message: message, senderId: message.senderId })
          }
        >
          <MoreVertIcon />
        </IconButton>
        <div
          className={clsx(
            classes.msgContainer,
            isSentByMe && classes.myMsgBoxContainer
          )}
        >
          {reply && (
            <div className={classes.replyMessageContainer}>
              <Typography variant="body2">
                {reply.message.senderName}
              </Typography>
              <Typography variant="caption">{reply.message.text}</Typography>
            </div>
          )}
          <Typography variant="body2" color={!isSentByMe ? "black" : "white"}>
            {message.text}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const MessageList = ({
  messages,
  userId,
  replyMessage,
  forwardMessage,
  incrementPage,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedMsg, setSelectedMsg] = React.useState(null);

  const handleClick = (event, msg) => {
    setAnchorEl(event.currentTarget);
    setSelectedMsg(msg);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMsg();
  };

  // console.log("onScroll", x, y);

  return (
    <div style={{ maxHeight: 300, overflow: "auto" }}>
      <Stack direction="column">
        <Menu
          anchorEl={
            // Check to see if the anchor is set.
            anchorEl
          }
          keepMounted
          open={
            // Likewise, check here to see if the anchor is set.
            Boolean(anchorEl)
          }
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem onClick={handleClose}>
            <IconButton size="small" onClick={() => replyMessage(selectedMsg)}>
              <ReplyIcon />
            </IconButton>

            {/* <Typography variant="body2" onClick={() => replyMessage(replymsg)}>
            Reply
          </Typography> */}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <IconButton
              size="small"
              onClick={() => forwardMessage(selectedMsg)}
            >
              <ForwardIcon />
            </IconButton>
          </MenuItem>
        </Menu>
        <Stack direction="row" justifyContent="center">
          <Button
            color="inherit"
            size="small"
            variant="outlined"
            sx={{ mt: 1.5, mb: 1.5 }}
            onClick={() => incrementPage()}
          >
            View Older Messages
          </Button>
        </Stack>
        {messages.map((m, i) => {
          const isSentByMe = m.message.senderId === userId;
          return (
            <>
              <MessageDisplay
                isSentByMe={isSentByMe}
                reply={m.reply}
                onMenuClick={(e, m) => handleClick(e, m)}
                message={m.message}
              />
            </>
          );
        })}
      </Stack>
    </div>
  );
};
export default MessageList;

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     message: {
//       margin: theme.spacing(1, 0),
//     },
//     messageRow: {
//       display: "flex",
//     },
//     messageRowRight: {
//       display: "flex",
//       justifyContent: "flex-end",
//     },
//     messageLeft: {
//       position: "relative",
//       marginLeft: theme.spacing(1),
//       marginBottom: theme.spacing(2),
//       padding: theme.spacing(1),
//       backgroundColor: theme.palette.secondary.light,
//       maxWidth: theme.spacing(40),
//       borderRadius: theme.palette.radius.medium,
//       borderTopLeftRadius: 0,
//     },
//     messageRight: {
//       marginRight: theme.spacing(1),
//       marginBottom: theme.spacing(2),
//       padding: theme.spacing(1),
//       backgroundColor: theme.palette.primary.light,
//       borderRadius: theme.palette.radius.medium,
//       borderTopRightRadius: 0,
//       maxWidth: theme.spacing(40),
//     },

//     messageContent: {
//       fontSize: theme.palette.fontSizes.base,
//     },
//     messagetimeRight: {
//       fontWeight: theme.palette.fontWeights.medium,
//     },

//     avatar: {
//       width: theme.spacing(4),
//       height: theme.spacing(4),
//       background: theme.palette.secondary.main,
//     },
//     displayNameLeft: {
//       fontSize: theme.palette.fontSizes.sm,
//       fontWeight: theme.palette.fontWeights.medium,
//       color: theme.palette.gray[1200],
//       margin: theme.spacing(0, 1),
//     },
//     displayNameRight: {
//       fontSize: theme.palette.fontSizes.sm,
//       fontWeight: theme.palette.fontWeights.medium,
//       color: theme.palette.gray[1200],
//       margin: theme.spacing(0, 1),
//       textAlign: "right",
//     },
//   })
// );
// import React from "react";
// import { createStyles, makeStyles, Theme } from "@mui/styles";
// import Avatar from "@mui/material/Avatar";
// import { Stack, Typography } from "@mui/material";
// import DoubleCheckIcon from "@mui/icons-material/DoneAllTwoTone";
// import CheckIcon from "@mui/icons-material/CheckTwoTone";
// import clsx from "clsx";
// import "react-chat-elements/dist/main.css";
// import { MessageBox } from "react-chat-elements";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     message: {
//       margin: theme.spacing(1, 0),
//     },
//     messageRow: {
//       display: "flex",
//     },
//     messageRowRight: {
//       display: "flex",
//       justifyContent: "flex-end",
//     },
//     messageLeft: {
//       position: "relative",
//       marginLeft: theme.spacing(1),
//       marginBottom: theme.spacing(2),
//       padding: theme.spacing(1),
//       backgroundColor: theme.palette.secondary.light,
//       maxWidth: theme.spacing(40),
//       borderRadius: theme.palette.radius.medium,
//       borderTopLeftRadius: 0,
//     },
//     messageRight: {
//       marginRight: theme.spacing(1),
//       marginBottom: theme.spacing(2),
//       padding: theme.spacing(1),
//       backgroundColor: theme.palette.primary.light,
//       borderRadius: theme.palette.radius.medium,
//       borderTopRightRadius: 0,
//       maxWidth: theme.spacing(40),
//     },

//     messageContent: {
//       fontSize: theme.palette.fontSizes.base,
//     },
//     messagetimeRight: {
//       fontWeight: theme.palette.fontWeights.medium,
//     },

//     avatar: {
//       width: theme.spacing(4),
//       height: theme.spacing(4),
//       background: theme.palette.secondary.main,
//     },
//     displayNameLeft: {
//       fontSize: theme.palette.fontSizes.sm,
//       fontWeight: theme.palette.fontWeights.medium,
//       color: theme.palette.gray[1200],
//       margin: theme.spacing(0, 1),
//     },
//     displayNameRight: {
//       fontSize: theme.palette.fontSizes.sm,
//       fontWeight: theme.palette.fontWeights.medium,
//       color: theme.palette.gray[1200],
//       margin: theme.spacing(0, 1),
//       textAlign: "right",
//     },
//   })
// );

// const Message = ({ messages, userId }) => {
//   return (
//     <Stack direction="column">
//       {messages.map((m, i) => {
//         const isSentByME = m.userId === userId;

//         return (
//           <MessageBox
//           position={isSentByME ?'right':'left'}
//             replyButton
//             reply={{
//               photoURL: "https://facebook.github.io/react/img/logo.svg",
//               title: "elit magna",
//               titleColor: "#8717ae",
//               message: "Aliqua amet incididunt id nostrud",
//             }}
//             forwarded
//             onReplyMessageClick={() => console.log("reply clicked!")}
//             text={m.message.text}
//             key={i}
//           />
//         );
//       })}
//     </Stack>
//   );
// };
// export default Message;
