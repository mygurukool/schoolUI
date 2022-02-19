import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";
import CloseIcon from "@mui/icons-material/CloseOutlined";

import {
  createAssignmet,
  editAssignmet,
  getAssignments,
} from "../../redux/action/assignmentActions";
import FormCreator from "../Form/FormCreator";
import moment from "moment";
import { DATETIMEFORMAT } from "../../constants";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
  AddLink,
  Close,
  Delete,
  FiberDvr,
  FileDownload,
  Link,
  Upload,
  UploadFile,
  YouTube,
} from "@mui/icons-material";
import useModal from "../../hooks/useModal";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import StudentSelectorDrawer from "./StudentSelectorDrawer";
import AddYoutubeLink from "./AddYoutubeLink";
import AddUrlLink from "./AddUrlLink";

import { Editor } from "react-draft-wysiwyg";
import {
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateFromHTML } from "draft-js-import-html";
import draftToHtml from "draftjs-to-html";

const defaultValues = {
  assignmentTitle: undefined,
  instructions: undefined,
  students: undefined,
  points: undefined,
  dueDate: undefined,
};
const AssignmentModal = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  React.useEffect(() => {
    console.log("editorState", editorState);
  }, [editorState]);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    getValues,
    formState: { errors },
    reset,
  } = useForm({});

  const {
    open: youtubeOpen,
    openModal: openYoutubeModal,
    closeModal: closeYoutubeModal,
    modalData: youtubeModalData,
  } = useModal();

  const {
    open: linkOpen,
    openModal: openLinkModal,
    closeModal: closeLinkModal,
    modalData: linkModalData,
  } = useModal();

  const {
    open: studentSidebarOpen,
    openModal: openStudentSidebar,
    closeModal: closeStudentSidebar,
  } = useModal();

  const classes = useStyles();
  const dispatch = useDispatch();
  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { organizationId, id } = useSelector((state) => state.user);
  const [explanationFiles, setExplanationFiles] = React.useState([]);
  const [uploadedFiles, setUploadedFiles] = React.useState([]);

  const { groups, currentCourse, currentGroup, students } = useSelector(
    (state) => state.common
  );

  const courseId = currentCourse?.id || currentCourse?._id;
  const groupId = currentGroup?.id || currentGroup?._id;
  const [isLoading, setIsLoading] = React.useState(false);

  const mode = modalData ? "edit" : "add";

  const open = modalOpen === "assignment";
  const handleClose = () => {
    reset(defaultValues);
    setUploadedFiles([]);
    setExplanationFiles([]);

    dispatch(closeModal());
    setEditorState(EditorState.createEmpty());
    setIsLoading(false);
  };

  const handleYoutubeModal = (link) => {
    openYoutubeModal(link);
  };
  const handleCloseYoutubeModal = (link) => {
    closeYoutubeModal();
  };

  const handleCloseLinkModal = (link) => {
    closeLinkModal();
  };

  const handleSubmitExplanationModal = (link) => {
    setExplanationFiles([...explanationFiles, link]);
  };
  const handleDeleteExplanationFile = (file, fileIndex) => {
    setExplanationFiles(explanationFiles.filter((d) => d !== file));
  };

  const handleDeleteUploadFile = (file, fileIndex) => {
    setUploadedFiles(uploadedFiles.filter((d) => d !== file));
  };

  const onSubmit = (data) => {
    console.log("data", data);
    if (!data.students) {
      data.students = students;
    }
    // if (data?.students.length === 0) {
    //   alert("Please select students");
    // } else {
    //   data.students = students;
    // }
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    const markup = draftToHtml(rawContentState);

    setIsLoading(true);
    if (mode === "add") {
      dispatch(
        createAssignmet(
          {
            ...data,
            groupId: currentGroup?._id || currentGroup?.id,
            courseId: currentCourse?._id || currentCourse?.id,

            audioVideo: explanationFiles,
            uploadExercises: uploadedFiles,
            instructions: markup,
          },
          () => {
            handleClose();
            dispatch(getAssignments(currentCourse?._id || currentCourse?.id));
          }
        )
      );
    } else {
      dispatch(
        editAssignmet(
          {
            ...data,
            groupId: currentGroup?._id || currentGroup?.id,
            courseId: currentCourse?._id || currentCourse?.id,

            audioVideo: explanationFiles,
            uploadExercises: uploadedFiles,
            instructions: markup,
          },
          () => {
            handleClose();
            dispatch(getAssignments(currentCourse?._id || currentCourse?.id));
          }
        )
      );
    }
  };
  const formRef = React.useRef();
  const uploadInputRef = React.useRef();

  React.useEffect(() => {
    if (open && modalData) {
      reset(modalData);
      if (modalData?.audioVideo) {
        setExplanationFiles(modalData?.audioVideo);
      }
      if (modalData?.uploadExercises) {
        setUploadedFiles(modalData?.uploadExercises);
      }
      if (modalData?.dueDate) {
        setValue(
          "dueDate",
          moment(modalData?.dueDate, DATETIMEFORMAT).toDate()
        );
      }
      if (modalData.instructions) {
        let contentState = stateFromHTML(modalData.instructions);
        setEditorState(EditorState.createWithContent(contentState));
        // const contentState = EditorState.createFromBlockArray(
        //   contentBlocks,
        //   entityMap
        // );
        // const myeditorState = EditorState.createWithContent(contentState);
      }
    }
  }, [open]);
  const btnRef = React.useRef();

  return (
    <Dialog
      open={open}
      title={modalData ? "Edit Assginment" : "Create Assignment"}
      size="lg"
      fullScreen
      onClose={() => handleClose()}
      hideButtons
    // onSubmit={(e) => {
    //   alert("hehe");
    //   e.preventDefault();
    //   formRef.current.submit();
    // }}
    >
      <DialogTitle>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">
            {modalData ? "Edit Assginment" : "Create Assignment"}
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <AddYoutubeLink
          open={youtubeOpen}
          onClose={handleCloseYoutubeModal}
          onSubmit={handleSubmitExplanationModal}
          data={youtubeModalData}
        />
        <AddUrlLink
          open={linkOpen}
          onClose={handleCloseLinkModal}
          onSubmit={handleSubmitExplanationModal}
          data={linkModalData}
        />

        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <Grid
            container
            direction="row"
            spacing={2}
            className={classes.gridContainer}
          >
            <Grid item lg={9} md={8} sm={7} xs={12}>
              <Stack direction="column" spacing={2}>
                <Controller
                  name="assignmentTitle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Title"
                      variant="outlined"
                      {...field}
                      error={errors["assignmentTitle"]}
                      helperText={
                        errors["assignmentTitle"] &&
                        errors["assignmentTitle"]?.message
                      }
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Title is required",
                    },
                  }}
                />

                <Controller
                  name="instructions"
                  control={control}
                  render={({ field }) => {
                    return (
                      <>
                        <InputLabel id="instruction" variant="standard">
                          Instructions
                        </InputLabel>
                        <Editor
                          editorState={editorState}
                          onEditorStateChange={setEditorState}
                        />
                        {/* <SunEditor
                        width="100%"
                        height="100%"
                        placeholder="Please type instructions here..."
                        setOptions={{
                          buttonList: buttonList.complex,
                        }}
                        defaultValue="<p>The editor's default value</p>"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      /> */}
                      </>
                    );
                  }}
                />

                <Stack>
                  <InputLabel>Audio/Video Explanation</InputLabel>

                  <Stack direction="row" spacing={2} mt={2}>
                    <ToolTipIconButton
                      title="Add  Youtube Link"
                      icon={<YouTube />}
                      onClick={() => openYoutubeModal()}
                    />

                    <ToolTipIconButton
                      title="Add Any Website Link"
                      icon={<AddLink />}
                      onClick={() => openLinkModal()}
                    />
                  </Stack>

                  <Stack>
                    <ItemList
                      data={explanationFiles}
                      onDelete={(d) => handleDeleteExplanationFile(d)}
                    />
                  </Stack>
                </Stack>
                <Stack>
                  <InputLabel>Upload Excersice</InputLabel>

                  <Stack direction="row" mt={2}>
                    <input
                      ref={uploadInputRef}
                      hidden
                      type="file"
                      onChange={(e) => {
                        const value = e.target.files[0];
                        setUploadedFiles([
                          ...uploadedFiles,
                          { type: "file", metaData: value },
                        ]);
                      }}
                    // {...register("file")}
                    />
                    <ToolTipIconButton
                      title="Upload Any File"
                      icon={<UploadFile />}
                      onClick={() => uploadInputRef.current.click()}
                    />
                  </Stack>

                  <Stack>
                    <ItemList
                      data={uploadedFiles}
                      onDelete={(d) => handleDeleteUploadFile(d)}
                    />
                  </Stack>
                </Stack>

                <Stack direction="column"></Stack>
              </Stack>
            </Grid>
            <Grid item lg={3} md={4} sm={5} xs={12} className={classes.sideGrid}>
              <Stack direction="column" spacing={3}>
                <TextField
                  variant="outlined"
                  label="For"
                  value={currentCourse?.courseName}
                  disabled
                />
                <Controller
                  name="students"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel>Students</InputLabel>
                      <TextField
                        readOnly
                        onClick={() => openStudentSidebar()}
                        value={
                          field.value
                            ? `${field.value?.length} student`
                            : `${students.length} student`
                        }
                      />
                      <StudentSelectorDrawer
                        open={studentSidebarOpen}
                        onClose={closeStudentSidebar}
                        defaultSelected={field.value}
                        students={students}
                        setStudents={(val) => field.onChange(val)}
                      />
                    </>
                  )}
                />

                <Controller
                  name="points"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Points"
                        type="number"
                        min={-1}
                        max={100}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    );
                  }}
                  defaultValue={100}
                />

                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              variant="outlined"
                              error={errors["dueDate"]}
                              helperText={
                                errors["dueDate"] && errors["dueDate"]?.message
                              }
                            />
                          )}
                          label="Due date and time"
                          inputFormat={DATETIMEFORMAT}
                          value={moment(field.value, DATETIMEFORMAT)}
                          onChange={(newValue) => {
                            field.onChange(newValue);
                          }}
                        />
                      </LocalizationProvider>
                    );
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "Due Date is required",
                    },
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <input type="submit" style={{ display: "none" }} ref={btnRef} />
        </form>
      </DialogContent>

      <DialogActions>
        <Button type="reset" color="secondary" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          type={"submit"}
          variant="contained"
          color="success"
          onClick={(e) => {
            e.preventDefault();
            btnRef.current.click();
          }}
          disabled={isLoading}
          sx={{ mr: 1 }}
        >
          {isLoading && <CircularProgress size={20} color="secondary" />}
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentModal;

const ToolTipIconButton = ({ icon, title, onClick, value, onDelete }) => {
  const classes = useStyles();
  return (
    <Tooltip title={title}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        className={classes.iconButtonContainer}
      >
        <IconButton color="primary" onClick={onClick}>
          {icon}
        </IconButton>
      </Stack>
    </Tooltip>
  );
};

const ItemList = ({ data, onDelete }) => {
  const classes = useStyles();
  return (
    <List>
      {data.map((d, di) => {
        const title = getTitle(d?.metaData || d, d.type || "file");
        return (
          <ListItem className={classes.listItem} key={di}>
            <ListItemIcon>{getIcon(d.type)}</ListItemIcon>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => onDelete(d)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

const getIcon = (type) => {
  switch (type) {
    case "youtube":
      return <YouTube />;
      break;

    default:
      return <UploadFile />;
      break;
  }
};

const getTitle = (data, type) => {
  console.log("getTitle", data, type);
  switch (type) {
    case "youtube":
      return data.title;

    case "video":
      return data.title;

    case "file":
      return data.filename || data.name;

    case "link":
      return data.ogTitle;

    default:
      return data?.title;
  }
};
const useStyles = makeStyles((theme) => ({
  root: {},
  iconButtonContainer: {
    border: `1px solid ${theme.palette.primary.main}`,
    // padding: theme.spacing(0.5),
    borderRadius: 50,
  },
  sideGrid: {
    // marginLeft: theme.spacing(2),
    // paddingLeft: theme.spacing(2),
    // borderLeft: `0.5px solid red`,
  },
  drawerRoot: {
    zIndex: 1500,
    width: "20vw",
  },
  gridContainer: {
    minHeight: "83vh",
  },
  listItem: {
    border: "1px solid #f5f5f5",
  },
}));

const formData = [
  {
    type: "text",
    name: "assignmentTitle",
    label: "Title",
    placeholder: "Assignment Title",
    required: true,
    size: 8,
  },

  {
    type: "dateTime",
    name: "dueDate",
    label: "Due",
    placeholder: "Assignment Due Date",
    required: true,
    size: 4,
  },

  // {
  //   type: "autocomplete",
  //   name: "students",
  //   label: "Students",
  //   placeholder: "Assignment Students",
  //   required: false,
  //   multiple: true,

  //   size: 6,

  //   hasOptions: true,
  //   optionLabelProp: (e) => e.name,
  //   optionValueProp: (e) => e.studentId,
  // },

  {
    type: "richText",
    name: "instructions",
    label: "Instructions",
    placeholder: "Assignment Students",
    required: false,
    size: 12,
  },
];
