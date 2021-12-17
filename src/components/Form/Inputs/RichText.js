import { Card, CardContent, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import InputContainer from "./InputContainer";
import { Controller } from "react-hook-form";
// import MUIRichTextEditor from "mui-rte";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
  },
}));
const RichText = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const { label, name, control, placeholder, size, error, rules, required } =
    props;

  const save = (data) => {
    console.log(data);
  };
  return (
    <InputContainer size={size} label={label}>
      <Controller
        name={name}
        control={control}
        {...props}
        render={({ field }) => {
          return (
            <SunEditor
              setOptions={{
                buttonList: buttonList.complex,
              }}
              defaultValue={field.value}
              placeholder="Please type here..."
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          );
        }} // props contain
        rules={rules}
      />
    </InputContainer>
  );
});
export default RichText;
