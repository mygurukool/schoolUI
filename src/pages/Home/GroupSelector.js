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
import { checkUploadPermission } from "../../redux/action/organizationActions";

const SelectGroup = () => {
  const dispatch = useDispatch();
  const { currentGroup, groups } = useSelector((state) => state.common);
  const [selectedGroup, setSelectedGroup] = React.useState("");

  const loginType = useSelector((state) => state.user.loginType);

  const groupNames = groups.map((g) => g.groupName);

  const filteredGroups = groupNames;
  const translate = useLanguages();

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const fieldRef = React.useRef();
  const deleteRef = React.useRef();

  // const isTeacher = useSelector((state) => state.user.isTeacher);
  const handleChange = (value) => {
    dispatch(removeAssignmentData());
    dispatch(removeCurrentCourse());
    setSelectedGroup(value?.groupName);
    dispatch(showSnackBar(`${translate("GROUP_CHANGED")} ${value.groupName}`));
    dispatch(
      getAllCourses({
        groupId: value?._id || value?.id,
        groupName: value?.groupName,
      })
    );
    dispatch(checkUploadPermission(value.organizationId));

    // dispatch(
    //   getAllStudents({
    //     groupId: value?._id || value?.id,
    //     role: ROLES["student"],
    //   })
    // );
    // dispatch(
    //   getAllTeachers({
    //     groupId: value?._id || value?.id,
    //     role: ROLES["teacher"],
    //   })
    // );
  };

  // };

  const handleDelete = (data) => {
    dispatch(
      deleteGroup(data, () => {
        dispatch(getAllGroups());
      })
    );
  };

  React.useEffect(() => {
    if (currentGroup) {
      handleChange(currentGroup);
    }
  }, [currentGroup]);

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
