import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/action/utilActions";

import ADDICON from "@mui/icons-material/AddTwoTone";
import EDITICON from "@mui/icons-material/EditTwoTone";
import DELETEICON from "@mui/icons-material/DeleteTwoTone";
import INVITEICON from "@mui/icons-material/PersonAddAltTwoTone";

import MENUICON from "@mui/icons-material/MoreVert";

import DeleteModal from "../../components/Modals/DeleteModal";
import { deleteGroup, getAllGroups } from "../../redux/action/groupActions";
import { removeUserAsTeacher } from "../../redux/action/userActions";
import {
  removeAssignmentData,
  removeCurrentCourse,
  setCurrentGroup,
} from "../../redux/action/commonActions";
import PermissionsGate from "../../components/PermissionGate";
import { SCOPES } from "../../constants";
import { getAllStudents } from "../../redux/action/studentActions";
import { getAllTeachers } from "../../redux/action/teacherActions";
import { getAllCourses } from "../../redux/action/coursesActions";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const SelectGroup = () => {
  const dispatch = useDispatch();
  const { currentGroup, groups } = useSelector((state) => state.common);
  const loginType = useSelector((state) => state.user.loginType);

  const filteredGroups = [...new Set(groups)];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const fieldRef = React.useRef();
  const deleteRef = React.useRef();

  const isTeacher = useSelector((state) => state.user.isTeacher);
  const handleChange = (value) => {
    dispatch(removeUserAsTeacher());
    dispatch(removeAssignmentData());
    dispatch(removeCurrentCourse());
    dispatch(setCurrentGroup(value));
    dispatch(getAllCourses(value?._id || value?.id));
  };

  const handleEdit = (data) => {
    dispatch(openModal("group", data));
    handleCloseMenu();
  };
  const handleInvite = (data) => {
    handleCloseMenu();
    dispatch(openModal("invitepeople"));
  };

  const handleDelete = (data) => {
    // dispatch(openModal("group", data));
    dispatch(
      deleteGroup(data, () => {
        dispatch(getAllGroups());
      })
    );
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    if (currentGroup === "all") {
      alert("Please Select a group");
      return;
    }
    deleteRef.current.open(currentGroup);
    handleCloseMenu();
  };

  const GroupMenu = () => {
    return (
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <PermissionsGate scopes={[SCOPES.CAN_CREATE_GROUP]}>
          <MenuItem onClick={() => handleEdit()}>
            <ListItemIcon>
              <ADDICON fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add group</ListItemText>
          </MenuItem>
        </PermissionsGate>

        {currentGroup && (
          <>
            <PermissionsGate scopes={[SCOPES.CAN_EDIT_GROUP]}>
              <MenuItem onClick={() => handleEdit(currentGroup)}>
                <ListItemIcon>
                  <EDITICON fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit {currentGroup?.groupName}</ListItemText>
              </MenuItem>
            </PermissionsGate>
            <PermissionsGate scopes={[SCOPES.CAN_DELETE_GROUP]}>
              <MenuItem onClick={() => onDelete()}>
                <ListItemIcon>
                  <DELETEICON fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete {currentGroup?.groupName}</ListItemText>
              </MenuItem>
            </PermissionsGate>
            <Divider />
            <PermissionsGate
              scopes={[SCOPES.CAN_INVITE_TEACHER, SCOPES.CAN_INVITE_STUDENT]}
            >
              <MenuItem onClick={() => handleInvite()}>
                <ListItemIcon>
                  <INVITEICON fontSize="small" />
                </ListItemIcon>
                <ListItemText>Invite People</ListItemText>
              </MenuItem>
            </PermissionsGate>
          </>
        )}
      </Menu>
    );
  };

  return (
    <>
      <PermissionsGate scopes={[SCOPES.CAN_DELETE_GROUP]}>
        <DeleteModal
          ref={deleteRef}
          getTitle={(g) => g?.groupName}
          onSubmit={(data) => handleDelete(data)}
        />
      </PermissionsGate>

      <Stack direction="row">
        <FormControl fullWidth>
          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            Group
          </InputLabel>
          <Select
            ref={fieldRef}
            fullWidth
            variant="outlined"
            size="small"
            label="Group"
            placeholder="Choose Group"
            color="secondary"
            value={currentGroup}
            defaultValue="all"
            onChange={({ target: { value } }) => {
              handleChange(value);
            }}
          >
            {/* <PermissionGate scopes={[SCOPES.canCreate]}> */}

            {/* </PermissionGate> */}

            {filteredGroups.length > 0 && (
              <MenuItem value="" disabled selected>
                No Groups available
              </MenuItem>
            )}

            {filteredGroups &&
              filteredGroups.map((g, i) => {
                return (
                  <MenuItem key={i} value={g}>
                    {g.groupName}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <PermissionsGate
          scopes={[
            SCOPES.CAN_CREATE_GROUP,
            SCOPES.CAN_EDIT_GROUP,
            SCOPES.CAN_DELETE_GROUP,
            SCOPES.CAN_INVITE_STUDENT,
            SCOPES.CAN_INVITE_TEACHER,
          ]}
        >
          <IconButton onClick={handleOpenMenu}>
            <MENUICON />
          </IconButton>
          <GroupMenu />
        </PermissionsGate>
      </Stack>
    </>
  );
};

export default SelectGroup;
