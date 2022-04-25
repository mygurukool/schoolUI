import { TextField } from "@mui/material";
import { makeStyles } from '@mui/styles'
import React from "react";
import InputContainer from "./InputContainer";
import { Controller } from "react-hook-form";
import { urlRegex } from "../../../helpers/regex";

const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}))
const TextBox = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { name, label, control, placeholder, size, error, rules, required } = props;
  return (
    <InputContainer size={size}>
      <Controller
        name={name}
        control={control}
        {...props}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            error={error}
            // size="Normal"
            label={`${label} ${required ? '*' : ''}`}
            placeholder={placeholder}
            className={classes.textField}
            helperText={error}
            InputProps={{
              classes: {
                notchedOutline: classes.textField,
              }
            }}
          />
        )} // props contain
        rules={{
          ...rules,
          pattern: {
            value: urlRegex,
            message: "Invalid url address",
          },
        }}
      />

    </InputContainer>

  );
});
export default TextBox;
