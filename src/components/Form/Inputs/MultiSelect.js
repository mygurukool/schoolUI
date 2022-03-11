import {
  MenuItem,
  Select,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";
import InputContainer from "./InputContainer";
const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}));
const MultiSelect = React.forwardRef((props) => {
  const classes = useStyles();
  const {
    label,
    name,
    options,
    optionLabelProp,
    optionValueProp,
    placeholder,
    control,
    error,
    defaultOption,
    size,
    required,
    rules,
    hasDefaultOption = false,
    onSelect,
    allowSelectAll,
  } = props;
  return (
    <InputContainer size={size}>
      <FormControl fullWidth>
        <InputLabel>{`${label} ${required ? "*" : ""}`}</InputLabel>
        <Controller
          control={control}
          name={name}
          {...props}
          render={({ field }) => {
            const selectAll = () => {
              if (field?.value?.length === options?.length) {
                field.onChange([]);
                return;
              }
              field.onChange(
                options
                  .map((opt) => opt[optionValueProp])
                  .filter((i) => Boolean(i))
              );
              onSelect &&
                onSelect(
                  options

                    .map((opt) => opt[optionValueProp])
                    .filter((i) => Boolean(i))
                );
            };

            return (
              <Select
                // {...field}
                value={
                  Array.isArray(field.value)
                    ? field.value
                    : field.value === "" || typeof field.value === "string"
                      ? [field.value]
                      : []
                }
                multiple
                fullWidth
                variant="outlined"
                error={error}
                size="Normal"
                label={`${label} ${required ? "*" : ""}`}
                placeholder={placeholder}
                className={classes.textField}
                onChange={(e) => {
                  if (e.target.value.includes("all")) {
                    selectAll();
                    return;
                  }

                  field.onChange(e.target.value);
                  onSelect && onSelect(e.target.value);
                }}
                helperText={error}
                InputProps={{
                  classes: {
                    notchedOutline: classes.textField,
                  },
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected &&
                      Array.isArray(selected) &&
                      selected.map((si, vi) => {
                        const found = options.find(
                          (o) => o[optionValueProp] === si
                        );
                        console.log('found', found, si, options, optionValueProp);
                        return (
                          <Chip key={vi} label={`${found[optionLabelProp]}`} />
                        );
                      })}
                  </Box>
                )}
              >
                {allowSelectAll && (
                  <MenuItem value="all">
                    <Checkbox
                      checked={
                        field?.value?.length ===
                        options.filter((i) => i.type !== "label")?.length
                      }
                    />
                    All {label}
                  </MenuItem>
                )}
                {hasDefaultOption && (
                  <MenuItem selected disabled>
                    Choose {label}
                  </MenuItem>
                )}
                {defaultOption && defaultOption()}
                {options.length > 0 ? (
                  options?.map((opt, index) => {
                    console.log("opt", opt);
                    if (opt.type === "label") {
                      return <ListSubheader>{opt.text}</ListSubheader>;
                    }

                    const check =
                      opt[optionValueProp] ===
                      (Array.isArray(field.value)
                        ? field.value?.find((o) => o === opt[optionValueProp])
                        : field.value);

                    return (
                      <MenuItem
                        value={optionValueProp ? opt[optionValueProp] : opt}
                        key={index}
                      >
                        <Checkbox checked={check} />
                        <ListItemText primary={opt[optionLabelProp]} />
                        {/* {opt[optionLabelProp]} */}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem selected disabled>
                    No Data
                  </MenuItem>
                )}
              </Select>
            );
          }} // props contain
          rules={rules}
        />
      </FormControl>
    </InputContainer>
  );
});
export default MultiSelect;
