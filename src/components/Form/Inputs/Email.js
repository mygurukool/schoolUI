import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import InputContainer from "./InputContainer";
import { Controller, useWatch } from "react-hook-form";
import { emailRegex } from "../../../helpers/regex";

const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}))
const TextBox = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { label, control, placeholder, type, size, error, rules, required } = props;
  return (
    <InputContainer size={size}>
      <Controller
        name="name"
        control={control}
        {...props}
        render={(props) => (
          <TextField
            {...props}
            fullWidth
            variant="outlined"
            error={error}
            // size="Normal"
            label={`${label} ${required ? '*' : ''}`}
            placeholder={placeholder}
            helperText={error}
          />
        )}
        rules={{
          ...rules, pattern: {
            value: emailRegex,
            message: "Invalid email address",
          },
        }}
      />

    </InputContainer>

  );
});
export default TextBox;
