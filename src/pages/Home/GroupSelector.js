import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
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

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const SelectGroup = () => {
  const dispatch = useDispatch();
  const { currentGroup, groups } = useSelector((state) => state.common);

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
  };

  const handleEdit = (data) => {
    dispatch(openModal("group", data));
    handleCloseMenu();
  };
  const handleInvite = (data) => {
    dispatch(openModal("invitepeople", data));
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
        <MenuItem onClick={() => handleEdit()}>
          <ListItemIcon>
            <ADDICON fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add group</ListItemText>
        </MenuItem>
        {currentGroup !== "all" && (
          <>
            <MenuItem onClick={() => handleEdit(currentGroup)}>
              <ListItemIcon>
                <EDITICON fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit {currentGroup?.groupName}</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onDelete()}>
              <ListItemIcon>
                <DELETEICON fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete {currentGroup?.groupName}</ListItemText>
            </MenuItem>
          </>
        )}
        <Divider />
        <MenuItem onClick={() => handleInvite()}>
          <ListItemIcon>
            <INVITEICON fontSize="small" />
          </ListItemIcon>
          <ListItemText>Invite People</ListItemText>
        </MenuItem>
      </Menu>
    );
  };

  return (
    <>
      <DeleteModal
        ref={deleteRef}
        getTitle={(g) => g?.groupName}
        onSubmit={(data) => handleDelete(data)}
      />
      <Stack direction="row">
        <TextField
          ref={fieldRef}
          select
          fullWidth
          variant="outlined"
          size="small"
          label="Group"
          placeholder="Choose Group"
          color="secondary"
          value={currentGroup}
          onChange={({ target: { value } }) => {
            handleChange(value);
          }}
        >
          {/* <PermissionGate scopes={[SCOPES.canCreate]}> */}

          {/* </PermissionGate> */}

          {filteredGroups.length > 0 && (
            <MenuItem value={"all"}>All Groups</MenuItem>
          )}

          {filteredGroups &&
            filteredGroups.map((g, i) => {
              return (
                <MenuItem key={i} value={g}>
                  {g.groupName}
                </MenuItem>
              );
            })}
        </TextField>
        <IconButton onClick={handleOpenMenu}>
          <MENUICON />
        </IconButton>
        <GroupMenu />
      </Stack>
    </>
  );
};

export default SelectGroup;
