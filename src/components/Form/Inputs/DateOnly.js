import React from "react";
import InputContainer from "./InputContainer";
import { Controller } from "react-hook-form";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import { TextField } from "@mui/material";
import { DATEFORMAT } from "../../../constants";
import MomentAdapter from "@date-io/moment";
const TextBox = React.forwardRef((props, ref) => {
  const {
    label,
    control,
    name,
    placeholder,
    type,
    size,
    error,
    rules,
    required,
    inputProps,
    defaultValue,
  } = props;

  return (
    <InputContainer size={size}>
      <LocalizationProvider dateAdapter={MomentAdapter}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <MobileDatePicker
                inputFormat={DATEFORMAT}
                label={label}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={error}
                    fullWidth
                    helperText={error && error.message}
                    {...inputProps}
                    // value={moment(params.value).format(DATEFORMAT)}
                  />
                )}
              />
            );
          }}
          defaultValue={defaultValue || ""}
          rules={{
            ...(required && {
              required: {
                value: true,
                message: `${label} is Required`,
              },
            }),
            ...rules,
          }}
        />
      </LocalizationProvider>
    </InputContainer>
  );
});
export default TextBox;
