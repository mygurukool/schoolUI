import { TextField } from "@mui/material";
import { makeStyles } from '@mui/styles'
import React from "react";
import InputContainer from "./InputContainer";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}))
const TextBox = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { label, control, placeholder, required, size, error, rules } = props;
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
            multiline
            rows={2}
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
        )} // props contain
        rules={rules}
      />

    </InputContainer>

  );
});
export default TextBox;
