import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";
import CloseIcon from "@mui/icons-material/HighlightOffTwoTone";

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
import {
  AddLink,
  Close,
  DeleteTwoTone as Delete,
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
import { deleteUploadedFile } from "../../redux/action/assignmentActions";
import useLanguages from "../../hooks/useLanguage";

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
  const translate = useLanguages();
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

  // console.log("students", students);

  // const courseId = currentCourse?.id || currentCourse?._id;
  // const groupId = currentGroup?.id || currentGroup?._id;
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

  // const handleYoutubeModal = (link) => {
  //   openYoutubeModal(link);
  // };
  const handleCloseYoutubeModal = (link) => {
    closeYoutubeModal();
  };

  const handleCloseLinkModal = (link) => {
    closeLinkModal();
  };

  const handleSubmitExplanationModal = (link) => {
    setExplanationFiles([...explanationFiles, link]);
  };

  const handleSubmitFileModal = (link) => {
    // console.log("hello", link);
    setUploadedFiles([...uploadedFiles, link]);
  };
  const handleDeleteExplanationFile = (file, fileIndex) => {
    setExplanationFiles(explanationFiles.filter((d) => d !== file));
  };

  const handleDeleteUploadFile = (file, fileIndex) => {
    const fileId = file?.id || file?.metaData?.id;

    if (fileId) {
      dispatch(
        deleteUploadedFile(
          {
            id: file.id || file?.metaData?.id,
            assignmentId: modalData.id || modalData._id,
          },
          () => {
            setUploadedFiles(uploadedFiles.filter((d) => d !== file));
          }
        )
      );
    } else {
      setUploadedFiles(uploadedFiles.filter((d) => d !== file));
    }
  };

  const onSubmit = (data) => {
    if (!data.students) {
      data.students = students.map((s) => s._id || s.id);
    }

    const rawContentState = convertToRaw(editorState.getCurrentContent());

    const markup = draftToHtml(rawContentState);

    // console.log("uploaded", uploadedFiles);

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
          },
          () => {
            setIsLoading(false);
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
            uploadExercises: uploadedFiles?.filter((f) => {
              if (f?.metaData?.id || f?.id) {
                return false;
              }
              return true;
            }),
            instructions: markup,
          },
          () => {
            handleClose();
            dispatch(getAssignments(currentCourse?._id || currentCourse?.id));
          },
          () => {
            setIsLoading(false);
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
        let files = [];
        modalData?.uploadExercises?.map((ex) => {
          // console.log("uploadExercises", ex);
          if (ex.ogTitle) {
            files.push({ type: "link", metaData: ex });
            // setUploadedFiles([
            //   ...uploadedFiles,
            //   { type: "link", metaData: ex },
            // ]);
          } else {
            files.push(ex);
            // setUploadedFiles([...uploadedFiles, ex]);
          }
        });
        setUploadedFiles(files);
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
            {modalData
              ? translate("EDIT_ASSIGNMENT")
              : translate("CREATE_ASSIGNMENT")}
          </Typography>
          <Tooltip title={translate("CLOSE")}>
            <IconButton color="error" aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
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
          onSubmit={handleSubmitFileModal}
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
                      label={translate("TITLE")}
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
                      message: translate("TITLE_REQUIRED"),
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
                          {translate("INSTRUCTIONS")}
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
                  <InputLabel>
                    {translate("AUDIO_VIDEO_EXPLANATION")}
                  </InputLabel>

                  <Stack direction="row" spacing={2} mt={2}>
                    <ToolTipIconButton
                      title={translate("ADD_YOUTUBE_VIDEO_LINK")}
                      icon={<YouTube />}
                      onClick={() => openYoutubeModal()}
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
                  <InputLabel>{translate("UPLOAD_EXERCISE")}</InputLabel>

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
                      title={translate("UPLOAD_ANY_FILE")}
                      icon={<UploadFile />}
                      onClick={() => uploadInputRef.current.click()}
                    />

                    <ToolTipIconButton
                      title={translate("ADD_ANY_WEBSITE_LINK")}
                      icon={<AddLink />}
                      onClick={() => openLinkModal()}
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
            <Grid
              item
              lg={3}
              md={4}
              sm={5}
              xs={12}
              className={classes.sideGrid}
            >
              <Stack direction="column" spacing={3}>
                <TextField
                  variant="outlined"
                  label={translate("FOR")}
                  value={currentCourse?.courseName}
                  disabled
                />
                <Controller
                  name="students"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel>{translate("STUDENTS")}</InputLabel>
                      <TextField
                        readOnly
                        onClick={() => openStudentSidebar()}
                        value={
                          field.value
                            ? `${field.value?.length} ${translate("STUDENT")}`
                            : `${students.length} ${translate("STUDENT")}`
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
                        label={translate("POINTS")}
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
                          label={translate("DUE_DATE_TIME")}
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
                      message: translate("DUE_DATE_TIME_REQUIRED"),
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
          {translate("CANCEL")}
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
          {isLoading && (
            <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
          )}
          {translate("SUBMIT")}
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
  const translate = useLanguages();
  return (
    <List>
      {data.map((d, di) => {
        const title = getTitle(d?.metaData || d, d.type || "file");
        return (
          <ListItem className={classes.listItem} key={di}>
            <ListItemIcon>{getIcon(d.type)}</ListItemIcon>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
              <Tooltip title={translate("DELETE")}>
                <IconButton color="error" onClick={() => onDelete(d)}>
                  <Delete />
                </IconButton>
              </Tooltip>
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

    default:
      return <UploadFile />;
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
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
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
