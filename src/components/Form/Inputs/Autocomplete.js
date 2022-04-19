import { TextField, Autocomplete } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";
import InputContainer from "./InputContainer";

const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}));
const MyTextField = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const {
    label,
    name,
    options,
    optionLabelProp,
    optionValueProp,
    placeholder,
    multiline,
    rows,
    control,
    error,
    defaultOption,
    size,
    noPadding,
    disabled,
    required,
    rules,
    hasDefaultOption = false,
    onSelect,
    multiple,
  } = props;
  return (
    <InputContainer size={size}>
      <Controller
        control={control}
        name={name}
        {...props}
        render={({ field }) => {
          console.log("field", field);
          return (
            <Autocomplete
              {...field}
              multiple={multiple}
              fullWidth
              options={options}
              onChange={(e, v) => {
                console.log("onChange", v, optionValueProp, v[optionValueProp]);
                field.onChange(v[optionValueProp]);
                // props.onChange(optionValueProp(v));
              }}
              getOptionLabel={(option) => option[optionLabelProp]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label={label}
                  placeholder={placeholder}
                  error={error}
                  helperText={error}
                />
              )}
            />
          );
        }} // props contain
        rules={rules}
      />
    </InputContainer>
  );
});
export default MyTextField;
