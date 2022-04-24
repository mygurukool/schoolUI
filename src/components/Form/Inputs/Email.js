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
}));
const TextBox = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    label,
    control,
    placeholder,
    type,
    size,
    error,
    rules,
    required,
    readOnly,
    disabled,
  } = props;
  return (
    <InputContainer size={size}>
      <Controller
        name="name"
        control={control}
        {...props}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            error={error}
            // size="Normal"
            label={`${label} ${required ? "*" : ""}`}
            placeholder={placeholder}
            helperText={error}
            InputProps={{
              readOnly: readOnly,
              disabled: disabled,
            }}
          />
        )}
        rules={{
          ...rules,
          pattern: {
            value: emailRegex,
            message: "Invalid email address",
          },
        }}
      />
    </InputContainer>
  );
});
export default TextBox;
