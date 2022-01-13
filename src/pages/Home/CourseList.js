import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Alert,
  ButtonBase,
  Grid,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import clsx from "clsx";
import PermissionGate from "../../components/PermissionGate";
import { SCOPES } from "../../constants";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/action/utilActions";

import ADDICON from "@mui/icons-material/Add";
import EDITICON from "@mui/icons-material/Edit";
import DELETEICON from "@mui/icons-material/Delete";
import MENUICON from "@mui/icons-material/MoreVert";
import DeleteModal from "../../components/Modals/DeleteModal";

import { deleteCourse, getAllCourses } from "../../redux/action/coursesActions";
import { removeUserAsTeacher } from "../../redux/action/userActions";
import { setCurrentCourse } from "../../redux/action/commonActions";
import { getAssignments } from "../../redux/action/assignmentActions";
import { getAllStudents } from "../../redux/action/studentActions";
import { getAllTeachers } from "../../redux/action/teacherActions";

const useStyles = makeStyles((theme) => ({
  courseBtn: {
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1, 0, 0, 0),
    padding: theme.spacing(0.5, 1),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: theme.spacing(15),
    alignItems: "center",
    "&:first-child": {
      marginLeft: theme.spacing(0),
    },
    "&:last-child": {
      marginRight: theme.spacing(0),
    },
    "& img": {
      width: theme.spacing(9),
      height: theme.spacing(9),
      borderRadius: theme.spacing(10),
    },
    "& .MuiTypography-root": {
      whiteSpace: "nowrap",
      width: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  activeCourse: {
    border: `5px solid ${theme.palette.secondary.main}`,
  },
  addBtn: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    borderRadius: theme.spacing(10),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.gray[500],
  },
}));

const CoursesList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { groups, courses, currentCourse, currentGroup } = useSelector(
    (state) => state.common
  );

  const groupId = currentGroup?.id || currentGroup?._id;
  const loginType = useSelector((state) => state.user.loginType);
  const filteredCourses = courses.filter((c) => {
    if (!currentGroup) return true;
    else {
      return c.groupId === currentGroup?.id || c.groupId === currentGroup?._id;
    }
  });

  const onSelectCourse = (c) => {
    dispatch(removeUserAsTeacher());
    dispatch(setCurrentCourse(c));

    dispatch(getAssignments(c._id || c.id));
    if (loginType === "mygurukool") {
      dispatch(
        getAllStudents({
          groupId: c.groupId,
        })
      );
      dispatch(
        getAllTeachers({
          groupId: c.groupId,
        })
      );
    } else {
      dispatch(
        getAllStudents({
          courseId: c?.id || c?._id,
        })
      );
      dispatch(
        getAllTeachers({
          courseId: c?.id || c?._id,
        })
      );
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuData, setMenuData] = React.useState();

  const open = Boolean(anchorEl);
  const deleteRef = React.useRef();

  const onOpenModal = (data) => {
    dispatch(openModal("course", data));
  };

  const handleEdit = (data) => {
    console.log("menuData");
    dispatch(openModal("course", menuData));
    handleCloseMenu();
  };

  const handleDelete = (data) => {
    // dispatch(openModal("group", data));
    dispatch(
      deleteCourse(menuData, () => {
        dispatch(getAllCourses({ groupId }));
      })
    );
  };

  const handleOpenMenu = (event, data) => {
    setMenuData(data);

    console.log("handleOpenMenu", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    deleteRef.current.open(menuData);
    handleCloseMenu();
  };

  const AddNewCourse = ({ data }) => {
    return (
      <ButtonBase
        className={clsx(classes.courseBtn)}
        onClick={() => onOpenModal()}
      >
        <div className={clsx(classes.addBtn)}>
          <ADDICON fontSize="large" />
        </div>
        <Typography variant="body2">Add New Course</Typography>
      </ButtonBase>
    );
  };

  const CourseBtns = ({ data }) => {
    const isActive = data.id === currentCourse?.id;
    const imaage = "https://source.unsplash.com/random";
    return (
      <ButtonBase
        className={clsx(classes.courseBtn)}
        onClick={() => onSelectCourse(data)}
      >
        <img
          src={imaage}
          alt={data.courseName}
          className={isActive && classes.activeCourse}
          style={{ marginBottom: 10 }}
        />
        <Typography variant="body2">{data.courseName}</Typography>
      </ButtonBase>
    );
  };

  const CourseMenu = () => {
    return (
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem onClick={() => handleEdit()}>
          <ListItemIcon>
            <EDITICON fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onDelete()}>
          <ListItemIcon>
            <DELETEICON fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    );
  };

  return (
    <>
      <PermissionGate scopes={[SCOPES.CAN_DELETE_COURSE]}>
        <DeleteModal
          ref={deleteRef}
          getTitle={(g) => g?.courseName}
          onSubmit={(data) => handleDelete(data)}
        />
      </PermissionGate>
      <PermissionGate
        scopes={[
          SCOPES.CAN_CREATE_COURSE,
          SCOPES.CAN_EDIT_COURSE,
          SCOPES.CAN_DELETE_COURSE,
        ]}
      >
        <CourseMenu />
      </PermissionGate>
      <Grid
        item
        lg={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PermissionGate scopes={[SCOPES.canCreate]}>
          {groups.length === 0 && (
            <Alert severity="info">Please create a group to add courses</Alert>
          )}
        </PermissionGate>

        {filteredCourses &&
          filteredCourses.length > 0 &&
          filteredCourses.map((c, index) => {
            return (
              <div
                style={{
                  position: "relative",
                }}
              >
                <PermissionGate
                  scopes={[
                    SCOPES.CAN_CREATE_COURSE,
                    SCOPES.CAN_EDIT_COURSE,
                    SCOPES.CAN_DELETE_COURSE,
                  ]}
                >
                  <IconButton
                    onClick={(e) => handleOpenMenu(e, c)}
                    style={{
                      position: "absolute",
                      top: -10,
                      right: 0,
                      zIndex: 10,
                    }}
                  >
                    <MENUICON />
                  </IconButton>
                </PermissionGate>

                <CourseBtns data={c} />
              </div>
            );
          })}
        {groups.length > 0 && (
          <PermissionGate scopes={[SCOPES.CAN_CREATE_COURSE]}>
            <AddNewCourse />
          </PermissionGate>
        )}
      </Grid>
    </>
  );
};

export default CoursesList;
