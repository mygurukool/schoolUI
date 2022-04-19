import { makeStyles } from "@mui/styles";
import React from "react";
import InputContainer from "./InputContainer";
import { DropzoneArea } from 'material-ui-dropzone';
import { showSnackBar } from "../../../redux/action/snackActions";
import { useDispatch } from "react-redux";
import { BASEIMAGEURL } from "../../../constants";
const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
    minHeight: 20,
    padding: theme.spacing(0, 5, 2),
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.23)'
  },
  title: {
    fontSize: theme.palette.fontSizes.semibase
  }
}))
const MyTextField = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    label,
    name,
    options,
    mode,
    optionLabelProp,
    optionValueProp,
    placeholder,
    multiple,
    rows,
    control,
    error,
    size,
    noPadding,
    disabled,
    required,
    defaultValue,
    onFileChange,
  } = props;
  const handleChange = (files) => {
    onFileChange(name, files);
  }
  const dispatch = useDispatch()
  const initialFiles = () => {
    if (typeof defaultValue === 'object') {
      let initialFiles = []
      defaultValue?.map((value) => {
        initialFiles.push(BASEIMAGEURL + value)
      })
      return initialFiles
    } else {
      if (defaultValue) {
        return [BASEIMAGEURL + defaultValue]
      }
      return []
    }
  }
  console.log('initialFiles', initialFiles());
  const limit = 50
  return (
    <InputContainer
      size={size}
    >
      <DropzoneArea
        acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
        showFileNames
        dropzoneText={`Drag and drop a ${label} here or click ${required ? '*' : ''}`}
        placeholder={placeholder}
        showAlerts={false}
        dropzoneClass={classes.textField}
        dropzoneParagraphClass={classes.title}
        maxFileSize={2000000}
        filesLimit={!multiple ? 1 : limit}
        initialFiles={initialFiles()}
        getFileLimitExceedMessage={() => {
          dispatch(showSnackBar(`Maximum allowed number of files exceeded. Only ${limit} allowed`, 'error'))
        }}
        onChange={handleChange}
        {...props}
      />

    </InputContainer>
  );
});
export default MyTextField;
