import React from "react";
import { createStyles, makeStyles, Theme } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { Stack, Typography } from "@mui/material";
import DoubleCheckIcon from "@mui/icons-material/DoneAllTwoTone";
import CheckIcon from "@mui/icons-material/CheckTwoTone";
import clsx from "clsx";
import moment from "moment";
import { DATETIMEFORMAT } from "../../constants";
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
    maxWidth: "90%",
    minWidth: "30%",
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  myMsgBoxContainer: {
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
  },
}));

const MessageDisplay = ({ isSentByMe, message }) => {
  const classes = useStyles();
  const messageTime = moment(message.timeStamp).format(DATETIMEFORMAT);
  return (
    <div className={clsx(classes.root, isSentByMe && classes.myRoot)}>
      <div>
        {!isSentByMe && (
          <Typography variant="caption">{message.senderName}</Typography>
        )}
        <Typography variant="caption">{messageTime}</Typography>
        <div
          className={clsx(
            classes.msgContainer,
            isSentByMe && classes.myMsgBoxContainer
          )}
        >
          <Typography>{message.text}</Typography>
        </div>
      </div>
    </div>
  );
};

const MessageList = ({ messages, userId }) => {
  return (
    <Stack direction="column">
      {messages.map((m, i) => {
        const isSentByMe = m.userId === userId;
        return <MessageDisplay isSentByMe={isSentByMe} message={m.message} />;
      })}
    </Stack>
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
