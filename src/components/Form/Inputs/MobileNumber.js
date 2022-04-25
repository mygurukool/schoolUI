import { TextField } from "@mui/material";
import { makeStyles } from '@mui/styles'
import React from "react";
import { Controller } from "react-hook-form";
import { mobileRegex } from "../../../helpers/regex";
import InputContainer from "./InputContainer";
const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}))
const MyTextField = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const { name, label, control, placeholder, multiline, rows, error, size, rules, required } = props;
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
            type="number"
            size="Normal"
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
        )}
        rules={{
          ...rules, pattern: {
            value: mobileRegex,
            message: "Invalid mobile number",
          },
        }}
      />
    </InputContainer>
  );
});
export default MyTextField;
