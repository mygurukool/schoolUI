import React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles, Theme } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import DocumentIcon from "@mui/icons-material/AttachFileTwoTone";

import CloseIcon from "@mui/icons-material/HighlightOffTwoTone";
import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import ADDICON from "@mui/icons-material/Add";
import useLanguages from "../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  wrapForm: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  textField: {
    border: "none",
  },
  replyContainer: {
    borderTopLeftRadius: theme.palette.radius.base,
    borderTopRightRadius: theme.palette.radius.base,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  replyMessageContainer: {
    width: "100%",
    background: theme.palette.gray[500],
    padding: theme.spacing(1),
    borderRadius: theme.palette.radius.base,
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
  },
}));

const TextInput = ({
  onSendMessage,
  isTeacher,
  onOpenAddUsersToChat,
  reply,
  removeReply,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const textInputRef = React.useRef();
  const translate = useLanguages()
  const handleSend = () => {
    console.log("handlesend", value);
    if (value && value !== "") {
      onSendMessage(value);
      setValue("");
    }
  };
  // useKey("Enter", handleSend);
  const keyPress = (e) => {
    if (e.keyCode == 13) {
      setValue(e.target.value);
      handleSend();
    }
  };

  const ReplyTextField = () => {
    return (
      <div className={classes.replyContainer}>
        <Stack
          justifyContent={"space-between"}
          flexDirection={"row"}
          className={classes.replyMessageContainer}
        >
          <div>
            <Typography variant="body2">{reply.message.senderName}</Typography>
            <Typography variant="caption">{reply.message.text}</Typography>
          </div>
          <IconButton onClick={removeReply}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </div>
    );
  };

  return (
    <div className={classes.wrapForm}>
      {reply && <ReplyTextField />}
      <TextField
        ref={textInputRef}
        value={value}
        onKeyDown={keyPress}
        onChange={({ target: { value } }) => {
          setValue(value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                edge="end"
                color="secondary"
                sx={{ mr: 0.1 }}
              >
                <DocumentIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isTeacher && (
                <IconButton
                  edge="end"
                  color="secondary"
                  onClick={() => {
                    onOpenAddUsersToChat();
                  }}
                >
                  <ADDICON />
                </IconButton>
              )}
              <IconButton
                edge="end"
                color="secondary"
                disabled={value === ""}
                sx={{ mr: 0.1 }}
                onClick={() => {
                  handleSend();
                }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            padding: 5
          },
          disableUnderline: true,
        }}
        fullWidth
        placeholder={translate("TYPE_A_MESSAGE")}
        variant="standard"
      />
    </div>
  );
};
export default TextInput;
