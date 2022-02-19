import { Grid } from "@mui/material";
import React from "react";

const InputContainer = ({
  label,
  size,
  children,
  noPadding,
  error,
  control,
  ...props
}) => {
  return (
    <Grid item lg={size} sm={size} md={size} xs={size}>
      {children}
    </Grid>

  );
};

export default InputContainer;
