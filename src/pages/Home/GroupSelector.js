import React from "react";
import { makeStyles } from "@mui/styles";
import { MenuItem, TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const SelectGroup = ({ groups, currentGroup, onChangeGroup }) => {
  const classes = useStyles();

  return (
    <TextField
      select
      fullWidth
      variant="outlined"
      size="small"
      label="Group"
      placeholder="Choose Group"
      color="secondary"
      value={currentGroup}
      onChange={({ target: { value } }) => {
        onChangeGroup(value);
      }}
    >
      <MenuItem value={"all"}>All Groups</MenuItem>
      {groups &&
        groups.map((g, i) => {
          return (
            <MenuItem key={i} value={g}>
              {g}
            </MenuItem>
          );
        })}
    </TextField>
  );
};

export default SelectGroup;
