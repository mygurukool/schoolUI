import React from "react";
import { createStyles, makeStyles, styled, Theme } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
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
import useLanguages from "../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  parent: {
    margin: theme.spacing(0.5, 0)
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(0, 1)
  },
  myRoot: {
    flexDirection: "row-reverse",
  },
  msgContainer: {
    display: 'block',
    width: 'auto',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.gray[500],
    // maxWidth: "90%",
    // minWidth: "30%",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    maxWidth: 250,
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
  time: {
    color: theme.palette.gray[1100],
  },
}));

const MessageDisplay = ({ isSentByMe, message, timeStamp, isForwarded, onMenuClick, reply }) => {
  const classes = useStyles();
  const messageTime = moment(timeStamp).fromNow();
  // const messageTime = moment(timeStamp).format('hh:mm a');
  const translate = useLanguages()
  return (
    <div className={classes.parent}>
      <div className={clsx(classes.root, isSentByMe && classes.myRoot)} >
        <div>
          {!isSentByMe && (
            <Typography variant="caption"><strong>{message.senderName}</strong>&nbsp;</Typography>
          )}
          <Typography variant="caption" className={classes.time}>{messageTime}{isForwarded && <i> ({translate("FORWARDED")})</i>}</Typography>
          <IconButton
            size="small"
            onClick={(e) =>
              onMenuClick(e, { message: message, senderId: message.senderId })
            }
          >
            <MoreVertIcon
              fontSize="small"
            />
          </IconButton>
        </div>
      </div>
      <div className={clsx(classes.root, isSentByMe && classes.myRoot)}>
        <Stack flexDirection="column">

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
            <Typography variant="body1" color={!isSentByMe ? "black" : "white"}>
              {message.text}
            </Typography>
          </div>
        </Stack>
      </div>
    </div>

  );
};



const StyledMenu = styled((props) => <Menu elevation={0} {...props} />)(
  ({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
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
  })
);

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
  const translate = useLanguages()
  // console.log("onScroll", x, y);

  return (
    <div style={{ maxHeight: 300, overflow: "auto" }}>
      <Stack direction="column">
        <StyledMenu
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
          <MenuItem onClick={() => { replyMessage(selectedMsg); handleClose() }}>
            <ListItemIcon>
              <ReplyIcon />
            </ListItemIcon>
            <ListItemText>{translate("REPLY")}</ListItemText>
            {/* <Typography variant="body2" onClick={() => replyMessage(replymsg)}>
            Reply
          </Typography> */}
          </MenuItem>
          <MenuItem onClick={() => { forwardMessage(selectedMsg); handleClose() }}>
            <ListItemIcon>
              <ForwardIcon />
            </ListItemIcon>
            <ListItemText>{translate("FORWARD")}</ListItemText>
          </MenuItem>
        </StyledMenu>
        <Stack direction="row" justifyContent="center">
          <Button
            color="inherit"
            size="small"
            variant="outlined"
            sx={{ mt: 1.5, mb: 1.5 }}
            onClick={() => incrementPage()}
          >
            {translate("VIEW_OLDER_MESSAGE")}
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
                {...m}
              />
            </>
          );
        })}
      </Stack>
    </div>
  );
};
export default MessageList;
