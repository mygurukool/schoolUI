import React from "react";
import {
  // Divider,
  FormControl,
  Grid,
  // FormControlLabel,
  // IconButton,
  InputLabel,
  // ListItemIcon,
  // ListItemText,
  Menu,
  MenuItem,
  Select,
  Stack,
  // TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { openModal } from "../../redux/action/utilActions";

// import ADDICON from "@mui/icons-material/AddTwoTone";
// import EDITICON from "@mui/icons-material/EditTwoTone";
// import DELETEICON from "@mui/icons-material/DeleteTwoTone";
// import INVITEICON from "@mui/icons-material/PersonAddAltTwoTone";

// import MENUICON from "@mui/icons-material/MoreVert";

import DeleteModal from "../../components/Modals/DeleteModal";
import { deleteGroup, getAllGroups } from "../../redux/action/groupActions";
import { removeUserAsTeacher } from "../../redux/action/userActions";
import {
  removeAssignmentData,
  removeCurrentCourse,
  setCurrentGroup,
} from "../../redux/action/commonActions";
import PermissionsGate from "../../components/PermissionGate";
import { ROLES, SCOPES } from "../../constants";
// import { getAllStudents } from "../../redux/action/studentActions";
// import { getAllTeachers } from "../../redux/action/teacherActions";
import { getAllCourses } from "../../redux/action/coursesActions";
import { styled } from "@mui/system";
import { showSnackBar } from "../../redux/action/snackActions";
import { getAllStudents } from "../../redux/action/studentActions";
import { getAllTeachers } from "../../redux/action/teacherActions";
import useLanguages from "../../hooks/useLanguage";

const SelectGroup = () => {
  const dispatch = useDispatch();
  const { currentGroup, groups } = useSelector((state) => state.common);
  const [selectedGroup, setSelectedGroup] = React.useState("");

  const loginType = useSelector((state) => state.user.loginType);

  const groupNames = groups.map((g) => g.groupName);

  const filteredGroups = [...new Set(groupNames)];
  const translate = useLanguages();

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const fieldRef = React.useRef();
  const deleteRef = React.useRef();

  // const isTeacher = useSelector((state) => state.user.isTeacher);
  const handleChange = (value) => {
    dispatch(removeAssignmentData());
    dispatch(removeCurrentCourse());
    console.log("handleChange", value);
    setSelectedGroup(value?.groupName);
    dispatch(showSnackBar(`${translate("GROUP_CHANGED")} ${value.groupName}`));
    dispatch(getAllCourses({ groupId: value?._id || value?.id }));
    dispatch(
      getAllStudents({
        groupId: value?._id || value?.id,
        role: ROLES["student"],
      })
    );
    dispatch(
      getAllTeachers({
        groupId: value?._id || value?.id,
        role: ROLES["teacher"],
      })
    );
    if (loginType === "google") {
      dispatch(removeUserAsTeacher());
    }
  };

  // const handleEdit = (data) => {
  //   dispatch(openModal("group", data));
  //   handleCloseMenu();
  // };
  // const handleInvite = (data) => {
  //   handleCloseMenu();
  //   dispatch(openModal("invitepeople"));
  // };

  const handleDelete = (data) => {
    // dispatch(openModal("group", data));
    dispatch(
      deleteGroup(data, () => {
        dispatch(getAllGroups());
      })
    );
  };

  // const handleOpenMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleCloseMenu = (event) => {
  //   setAnchorEl(null);
  // };

  // const onDelete = () => {
  //   if (currentGroup === "all") {
  //     alert("Please Select a group");
  //     return;
  //   }
  //   deleteRef.current.open(currentGroup);
  //   handleCloseMenu();
  // };

  React.useEffect(() => {
    if (currentGroup) {
      handleChange(currentGroup);
    }
  }, [currentGroup]);

  // const GroupMenu = () => {
  //   return (
  //     <StyledMenu anchorEl={anchorEl} open={open} onClose={handleCloseMenu} >
  //       <PermissionsGate scopes={[SCOPES.CAN_CREATE_GROUP]}>
  //         <MenuItem onClick={() => handleEdit()}>
  //           <ListItemIcon>
  //             <ADDICON fontSize="small" />
  //           </ListItemIcon>
  //           <ListItemText>Add group</ListItemText>
  //         </MenuItem>
  //       </PermissionsGate>

  //       {currentGroup && (
  //         <>
  //           <PermissionsGate scopes={[SCOPES.CAN_EDIT_GROUP]}>
  //             <MenuItem onClick={() => handleEdit(currentGroup)}>
  //               <ListItemIcon>
  //                 <EDITICON fontSize="small" />
  //               </ListItemIcon>
  //               <ListItemText>Edit {currentGroup?.groupName}</ListItemText>
  //             </MenuItem>
  //           </PermissionsGate>
  //           <PermissionsGate scopes={[SCOPES.CAN_DELETE_GROUP]}>
  //             <MenuItem onClick={() => onDelete()}>
  //               <ListItemIcon>
  //                 <DELETEICON fontSize="small" />
  //               </ListItemIcon>
  //               <ListItemText>Delete {currentGroup?.groupName}</ListItemText>
  //             </MenuItem>
  //           </PermissionsGate>
  //           <Divider />
  //           <PermissionsGate
  //             scopes={[SCOPES.CAN_INVITE_TEACHER, SCOPES.CAN_INVITE_STUDENT]}
  //           >
  //             <MenuItem onClick={() => handleInvite()}>
  //               <ListItemIcon>
  //                 <INVITEICON fontSize="small" />
  //               </ListItemIcon>
  //               <ListItemText>Invite People</ListItemText>
  //             </MenuItem>
  //           </PermissionsGate>
  //         </>
  //       )}
  //     </StyledMenu>
  //   );
  // };

  return (
    <>
      <PermissionsGate scopes={[SCOPES.CAN_DELETE_GROUP]}>
        <DeleteModal
          ref={deleteRef}
          getTitle={(g) => g?.groupName}
          onSubmit={(data) => handleDelete(data)}
        />
      </PermissionsGate>

      <Grid item lg={4} md={4} sm={4} xs={6} className="groupSelector">
        <FormControl fullWidth>
          <InputLabel
            size="small"
            variant="outlined"
            htmlFor="uncontrolled-native"
          >
            {translate("GROUP")}
          </InputLabel>
          <Select
            ref={fieldRef}
            fullWidth
            variant="outlined"
            size="small"
            dense
            label={translate("GROUP")}
            value={selectedGroup}
            onChange={({ target: { value } }) => {
              const foundGroup = groups.find((g) => g?.groupName === value);
              dispatch(setCurrentGroup(foundGroup));
            }}
          >
            {/* <PermissionGate scopes={[SCOPES.canCreate]}> */}

            {/* </PermissionGate> */}

            {filteredGroups.length === 0 && (
              <MenuItem value="" disabled selected dense>
                {translate("NO_GROUP_AVAILABLE")}
              </MenuItem>
            )}

            {filteredGroups &&
              filteredGroups.map((g, i) => {
                return (
                  <MenuItem key={i} value={g} dense>
                    {g}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        {/* <PermissionsGate
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
        </PermissionsGate> */}
      </Grid>
    </>
  );
};

const StyledMenu = styled((props) => <Menu elevation={0} {...props} />)(
  ({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
      },
    },
  })
);

export default SelectGroup;
