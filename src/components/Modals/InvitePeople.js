import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";
import ClipBoardIcon from "@mui/icons-material/ContentPaste";
import PersonAddAlt from "@mui/icons-material/PersonAddAlt";
import Delete from "@mui/icons-material/Delete";
import Close from "@mui/icons-material/HighlightOffTwoTone";
import PermissionGate from "../PermissionGate";
import {
  Autocomplete,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";

import { showSnackBar } from "../../redux/action/snackActions";
import { invitePeople } from "../../redux/action/commonActions";
import {
  getAllTeachers,
  removeTeacher,
} from "../../redux/action/teacherActions";
import {
  getAllStudents,
  removeStudent,
} from "../../redux/action/studentActions";
import { ROLES, SCOPES } from "../../constants";
import { usePermissions } from "../PermissionGate";
import useLanguages from "../../hooks/useLanguage";
import { emailRegex } from "../../helpers/regex";
import validateEmail from "../../helpers/validateEmail";

const InvitePeople = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { organizationId, id, email, name } = useSelector(
    (state) => state.user
  );
  const { currentCourse, currentGroup, teachers, students } = useSelector(
    (state) => state.common
  );

  const translate = useLanguages();

  const groupId = currentGroup?.id || currentGroup?._id;

  const isLoading = useSelector((state) => state.util.spinner);

  const open = modalOpen === "invitepeople";

  const [inviteOpen, setInviteOpen] = React.useState();

  const handleClose = () => {
    setInviteOpen();
    dispatch(closeModal());
  };

  const onAdd = (data) => {
    setInviteOpen(data);
  };

  const getTeachers = () => {
    dispatch(
      getAllTeachers({
        groupId,
        role: ROLES["teacher"],
      })
    );
  };

  const getStudents = () => {
    dispatch(
      getAllStudents({
        groupId,
        role: ROLES["student"],
      })
    );
  };

  const onInvite = (data) => {
    // console.log("data", data);
    dispatch(
      invitePeople(
        {
          groupId: currentGroup.id || currentGroup._id,
          groupName: currentGroup.groupName,
          invitedBy: id,
          inviteeName: name || email,
          inviteeEmail: email,
          organizationId: organizationId,

          peoples: data,
          type: inviteOpen.type,
        },
        (res) => {
          const inviteLink = res.data.data;

          setInviteOpen({
            ...inviteOpen,
            inviteLink: inviteLink,
          });
        }
      )
    );
  };

  const onDeleteTeacher = (data) => {
    dispatch(
      removeTeacher(
        { id: data, groupId: currentGroup.id || currentGroup._id },
        () => {
          getTeachers();
        }
      )
    );
  };

  const onDeleteStudent = (data) => {
    dispatch(
      removeStudent(
        { id: data, groupId: currentGroup.id || currentGroup._id },
        () => {
          getStudents();
        }
      )
    );
  };

  React.useEffect(() => {
    if (open) {
      getTeachers();
      getStudents();
    }
  }, [open]);
  const canAddTeacher = usePermissions({ scopes: [SCOPES.CAN_CREATE_TEACHER] });
  const canAddStudent = usePermissions({ scopes: [SCOPES.CAN_CREATE_STUDENT] });

  return (
    <ModalContainer
      open={open}
      title={translate("PEOPLE")}
      onClose={() => handleClose()}
      size="md"
    >
      <Section
        inviteOpen={inviteOpen}
        onInviteClose={() => setInviteOpen()}
        onInvite={(data) => onInvite(data)}
        isLoading={isLoading}
        data={teachers || []}
        enableAdd={canAddTeacher}
        name="name"
        email="email"
        avatarProp="name"
        onDelete={(data) => onDeleteTeacher(data)}
        title="Teachers"
        type="teacher"
        onAdd={() => {
          onAdd({
            title: "Teachers",
            type: "teacher",
          });
        }}
        addPermission={"CAN-CREATE-TEACHER"}
        deletePermission={"CAN-DELETE-TEACHER"}
        viewPermission={"CAN-VIEW-TEACHER"}
      />
      <Section
        inviteOpen={inviteOpen}
        onInviteClose={() => setInviteOpen()}
        onInvite={(data) => onInvite(data)}
        isLoading={isLoading}
        data={students || []}
        enableAdd={canAddStudent}
        name="name"
        email="email"
        avatarProp="name"
        onDelete={(data) => onDeleteStudent(data)}
        type="student"
        title="Students"
        onAdd={() => {
          onAdd({
            title: "Students",
            type: "student",
          });
        }}
        addPermission={"CAN-CREATE-STUDENT"}
        deletePermission={"CAN-DELETE-STUDENT"}
        viewPermission={"CAN-VIEW-STUDENT"}
      />
    </ModalContainer>
  );
};

export default InvitePeople;

const Section = ({
  isLoading,
  title,
  onAdd,
  data = [],
  type,
  avatarProp,
  name,
  email,
  inviteOpen,
  onInviteClose,
  onInvite,
  onDelete,
  enableAdd,
  addPermission,
  deletePermission,
  viewPermission,
}) => {
  const classes = useStyles();
  const AddAction = () => {
    return (
      <PermissionGate scopes={[addPermission]}>
        <IconButton onClick={onAdd}>
          <PersonAddAlt />
        </IconButton>
      </PermissionGate>
    );
  };

  const DeleteAction = ({ data }) => {
    return (
      <PermissionGate scopes={[deletePermission]}>
        <IconButton onClick={() => onDelete(data.id || data._id)}>
          <Delete />
        </IconButton>
      </PermissionGate>
    );
  };

  return (
    <PermissionGate scopes={[viewPermission]}>
      <Card variant="outlined" className={classes.section}>
        <CardHeader subheader={title} action={enableAdd && <AddAction />} />
        <Divider />
        {inviteOpen?.type === type && (
          <>
            <CardContent>
              <InviteSection
                title={`Invite ${inviteOpen?.title}`}
                onClose={onInviteClose}
                onInvite={(data) => onInvite(data)}
                data={inviteOpen}
                isLoading={isLoading}
              />
            </CardContent>
          </>
        )}
        <CardContent>
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {data.map((d, i) => {
              return (
                <ListItem
                  key={i}
                  secondaryAction={<DeleteAction data={d} />}
                  disablePadding
                  sx={{ width: "100%" }}
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt={d[avatarProp]} src={d[avatarProp]} />
                    </ListItemAvatar>
                    <ListItemText primary={d[name]} secondary={d[email]} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </PermissionGate>
  );
};

const InviteSection = ({ title, onClose, onInvite, data, isLoading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const translate = useLanguages();
  const [inviteList, setInviteList] = React.useState([]);
  const [singleEmail, setSingleEmail] = React.useState();

  const handleCopy = () => {
    navigator.clipboard.writeText(data.inviteLink);
    dispatch(showSnackBar(translate("LINK_COPIED")));
  };

  const handleInvite = () => {
    if (inviteList.length === 0 && !singleEmail) {
      alert("Please enter an email id");
    } else if (inviteList.length === 0 && !validateEmail(singleEmail)) {
      alert("Invalid Email");
    } else if (inviteList.length === 0 && singleEmail) {
      onInvite([singleEmail]);
    } else {
      onInvite(inviteList);
    }
  };

  const CloseAction = () => {
    return (
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    );
  };
  return (
    <Card variant="outlined" className={classes.section}>
      <CardHeader subheader={title} action={<CloseAction />} />
      <Divider />
      <CardContent>
        <Autocomplete
          multiple
          value={inviteList}
          onChange={(event, newValue) => {
            console.log("onChange", newValue);
            if (typeof newValue === "string") {
              setInviteList(newValue);
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setInviteList(newValue.inputValue);
            } else {
              setInviteList(newValue);
            }
          }}
          onInputChange={(event, newInputValue) => {
            if (inviteList.length === 0) {
              setSingleEmail(newInputValue);
            }
          }}
          placeholder="Press enter after adding an email"
          handleHomeEndKeys
          options={[]}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter Email id"
              placeholder="Press enter after adding an email address"
            />
          )}
        />
      </CardContent>
      {data.inviteLink && (
        <>
          <Divider />
          <CardContent>
            <Stack direction="column" spacing={3}>
              <Stack>
                <Typography variant="subtitle2">
                  {translate("INVITE_LINK")}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.inviteLink}
                >
                  <Typography variant="subtitle1">{data.inviteLink}</Typography>
                  <IconButton
                    color="secondary"
                    className={classes.IconButton}
                    onClick={() => handleCopy()}
                  >
                    <ClipBoardIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </>
      )}
      <Divider />
      <CardActions>
        <Stack
          direction="row"
          justifyContent="flex-end"
          onClick={() => handleInvite()}
        >
          <Button variant="contained" color="primary">
            {isLoading && <CircularProgress />} {translate("INVITE")}
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};
const useStyles = makeStyles((theme) => ({
  // root: {},
  inviteLink: {
    backgroundColor: theme.palette.gray[600],
    padding: theme.spacing(0, 3),
  },
  IconButton: {
    backgroundColor: "white",
  },
  section: {
    marginBottom: theme.spacing(2),
  },
}));
