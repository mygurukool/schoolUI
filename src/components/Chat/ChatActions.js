import React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles, Theme } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import DocumentIcon from "@mui/icons-material/AttachFileTwoTone";

import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { useKey } from "react-use";


const useStyles = makeStyles((theme) => ({
  wrapForm: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  textField: {
    border: "none",
  },
  replyContainer: {

    borderTopLeftRadius: theme.palette.radius.base,
    borderTopRightRadius: theme.palette.radius.base,
    padding: theme.spacing(1),
  },
  replyMessageContainer: {
    width: '100%',
    background: theme.palette.gray[500],
    padding: theme.spacing(1),
    borderRadius: theme.palette.radius.base,
    borderLeft: `4px solid ${theme.palette.secondary.main}`
  },
}));




const TextInput = ({ onSendMessage, reply, removeReply }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const textInputRef = React.useRef();
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
      handleSend()
    }
  }

  const ReplyTextField = () => {
    return (
      <div className={classes.replyContainer}>
        <Stack justifyContent={'space-between'} flexDirection={'row'} className={classes.replyMessageContainer}>
          <div>
            <Typography variant="body2">{reply.message.senderName}</Typography>
            <Typography variant="caption">{reply.message.text}</Typography>
          </div>
          <IconButton onClick={removeReply}><CloseIcon /></IconButton>

        </Stack>

      </div>
    )
  }


  return (
    <div className={classes.wrapForm}>
      {reply && <ReplyTextField />}
      <TextField
        size="small"
        ref={textInputRef}
        value={value}
        onKeyDown={keyPress}
        onChange={({ target: { value } }) => {
          setValue(value);
        }}
        disableUnderline={false}
        InputProps={{

          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                color="secondary"
              >
                <DocumentIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                color="secondary"
                disabled={value === ""}
                onClick={() => {
                  handleSend();
                }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
          classes: {
            notchedOutline: classes.textField,
          }
        }}
        fullWidth
        placeholder="Type a message"
        variant="outlined"
      />

    </div>
  );
};
export default TextInput;
