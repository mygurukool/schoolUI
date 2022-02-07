import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import InputContainer from "./InputContainer";
import { Controller } from "react-hook-form";

const TextBox = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    control,
    placeholder,
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
        name={name}
        control={control}
        {...props}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              error={error}
              label={`${label} ${required ? "*" : ""}`}
              placeholder={placeholder}
              helperText={error}
              InputProps={{
                readOnly: readOnly,
                disabled: disabled,
              }}
            />
          );
        }} // props contain
        rules={rules}
      />
    </InputContainer>
  );
});
export default TextBox;
