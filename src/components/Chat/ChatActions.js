import React from "react";
import TextField from "@mui/material/TextField";
import { makeStyles, Theme } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import DocumentIcon from "@mui/icons-material/AttachFileTwoTone";

import Button from "@mui/material/Button";
import { Divider, IconButton, InputAdornment } from "@mui/material";
import { useKey } from "react-use";


const useStyles = makeStyles((theme) => ({
  wrapForm: {
    display: "flex",
    justifyContent: "space-between",
  },
  textField: {
    border: "none",
  },
}));

const TextInput = ({ onSendMessage }) => {
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

  return (
    <div className={classes.wrapForm}>

      <TextField
        size="small"
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
                aria-label="toggle password visibility"
                edge="end"
                color="primary"
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
                color="primary"
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
          },
        }}
        fullWidth
        placeholder="Type a message"
        variant="outlined"
      />
    </div>
  );
};
export default TextInput;
