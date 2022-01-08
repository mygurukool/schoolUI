import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";

import {
  createAssignmet,
  editAssignmet,
  getAssignments,
} from "../../redux/action/assignmentActions";
import FormCreator from "../Form/FormCreator";
import moment from "moment";
import { DATETIMEFORMAT } from "../../constants";
import {
  Button,
  Checkbox,
  DialogActions,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
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
  Close,
  Delete,
  Link,
  Upload,
  UploadFile,
  YouTube,
} from "@mui/icons-material";
import { borderRadius, Box } from "@mui/system";
import useModal from "../../hooks/useModal";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import StudentSelectorDrawer from "./StudentSelectorDrawer";
const AssignmentModal = () => {
  const {
    control,
    handleSubmit,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useForm({});

  const {
    open: linkOpen,
    openModal: openLinkModal,
    closeModal: closeLinkModal,
  } = useModal();

  const {
    open: youtubeOpen,
    openModal: openYoutubeModal,
    closeModal: closeYoutubeModal,
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

  const { groups, currentCourse, currentGroup, students } = useSelector(
    (state) => state.common
  );

  const courseId = currentCourse?.id || currentCourse?._id;
  const groupId = currentGroup?.id || currentGroup?._id;

  const mode = modalData ? "edit" : "add";

  const open = modalOpen === "assignment";
  const handleClose = () => {
    dispatch(closeModal());
  };

  // const handleSubmit = (data) => {
  //   if (mode === "add")
  //     dispatch(
  //       createAssignmet(
  //         {
  //           ...data,
  //           organizationId,

  //           courseId,
  //           groupId,
  //           userId: id,
  //         },
  //         () => {
  //           dispatch(getAssignments(courseId));
  //           handleClose();
  //         }
  //       )
  //     );
  //   else {
  //     dispatch(
  //       editAssignmet(
  //         {
  //           ...data,
  //           organizationId,
  //           courseId,
  //           groupId,

  //           userId: id,
  //         },
  //         () => {
  //           dispatch(getAssignments(courseId));
  //           handleClose();
  //         }
  //       )
  //     );
  //   }
  // };

  const onSubmit = (data) => {
    console.log("submit data", data);
    dispatch(createAssignmet(data));
  };
  const formRef = React.useRef();
  const uploadInputRef = React.useRef();

  return (
    <ModalContainer
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
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Grid container direction="row">
          <Grid item lg={9}>
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
                render={({ field }) => (
                  <>
                    <InputLabel id="instruction" variant="standard">
                      Instructions
                    </InputLabel>
                    <SunEditor
                      width="100%"
                      height="100%"
                      placeholder="Please type instructions here..."
                      setOptions={{
                        buttonList: buttonList.complex,
                      }}
                      defaultValue={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </>
                )}
              />

              <Stack>
                <InputLabel>Uploads</InputLabel>

                <Stack direction="row" spacing={2}>
                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          ref={uploadInputRef}
                          hidden
                          type="file"
                          onChange={(e) => {
                            setValue("file", e.target.files[0]);
                          }}
                          // {...register("file")}
                        />
                        <ToolTipIconButton
                          title="Upload file"
                          icon={<UploadFile />}
                          onClick={() => uploadInputRef.current.click()}
                          value={field.value?.name}
                          onDelete={() => setValue("file", undefined)}
                        />
                      </>
                    )}
                  />

                  <Controller
                    name="link"
                    control={control}
                    render={({ field }) => (
                      <>
                        <ModalContainer
                          open={linkOpen}
                          onClose={() => {
                            setValue("link", undefined);
                            closeLinkModal();
                          }}
                          onSubmit={closeLinkModal}
                          title="Add Link"
                          size="sm"
                        >
                          <TextField
                            label="Link"
                            variant="outlined"
                            fullWidth
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                          />
                        </ModalContainer>
                        <ToolTipIconButton
                          title="Add Link"
                          icon={<Link />}
                          onClick={() => openLinkModal()}
                          value={field.value}
                          onDelete={() => setValue("link", undefined)}
                        />
                      </>
                    )}
                  />
                  <Controller
                    name="youtubeLink"
                    control={control}
                    render={({ field }) => (
                      <>
                        <ModalContainer
                          open={youtubeOpen}
                          onClose={() => {
                            setValue("youtubeLink", undefined);
                            closeYoutubeModal();
                          }}
                          onSubmit={closeYoutubeModal}
                          title="Add Youtube Video Link"
                          size="sm"
                        >
                          <TextField
                            label="Youtube Video Link"
                            variant="outlined"
                            fullWidth
                            value={field.value}
                            onChange={(e) => field.onChange(e)}
                            InputProps={{
                              startAdornment: <YouTube color="secondary" />,
                            }}
                          />
                        </ModalContainer>
                        <ToolTipIconButton
                          title="Add  Youtube Link"
                          icon={<YouTube />}
                          onClick={() => openYoutubeModal()}
                          value={field.value}
                          onDelete={() => setValue("youtubeLink", undefined)}
                        />
                      </>
                    )}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item lg={3} className={classes.sideGrid}>
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
                        value={field.value}
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
        <Divider />
        <DialogActions>
          <Button type="reset" variant="outlined" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button type={"submit"} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </ModalContainer>
  );
};

export default AssignmentModal;

const ToolTipIconButton = ({ icon, title, onClick, value, onDelete }) => {
  const classes = useStyles();
  return (
    <Tooltip title={title}>
      <Stack
        direction="row"
        alignItems="center"
        className={classes.iconButtonContainer}
      >
        <IconButton color="secondary" onClick={onClick}>
          {icon}
        </IconButton>
        {value && (
          <Stack direction="row" alignItems="center">
            <Typography variant="caption">{value}</Typography>

            <IconButton size="small" onClick={onDelete}>
              <Close />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Tooltip>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  iconButtonContainer: {
    backgroundColor: `#eee`,
    padding: theme.spacing(0.5, 2),
    borderRadius: 50,
  },
  sideGrid: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2),

    borderLeft: `0.5px solid red`,
  },
  drawerRoot: {
    zIndex: 1500,
    width: "20vw",
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
