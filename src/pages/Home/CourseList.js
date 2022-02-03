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
import { styled } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  },
  courseBtnContainer: {
    borderRadius: theme.palette.radius.base,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.black,
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
    }
  },
  courseBtn: {
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
  },
  addBtn: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    borderRadius: theme.spacing(10),
    display: "flex",
    margin: theme.spacing(1, 0, 0, 0),
    padding: theme.spacing(0.5, 1),
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

    if (loginType === "google") {
      return c.section === currentGroup?.groupName;
    } else {
      return c.groupId === currentGroup?.id || c.groupId === currentGroup?._id;
    }
  });

  const onSelectCourse = (c) => {
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
      dispatch(removeUserAsTeacher());

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
      // <ButtonBase
      //   className={clsx(classes.buttonBase)}
      //   onClick={() => onOpenModal()}
      // >
      //   <div className={clsx(classes.courseBtn)}>
      //     <img
      //       src="images/add.jpg"
      //       // className={isActive && classes.activeCourse}
      //       style={{ marginBottom: 10 }}
      //     />
      //     <Typography variant="subtitle2">Add New Course</Typography>
      //   </div>
      //   {/* <div className={clsx(classes.addBtn)}>
      //     <ADDICON fontSize="large" />
      //   </div> */}
      //   {/* <Typography variant="subtitle2">Add New Course</Typography> */}
      // </ButtonBase>
      <ButtonBase
        className={clsx(classes.buttonBase)}
        onClick={() => onOpenModal()}
      >
        <div className={clsx(classes.courseBtn)}>
          <img
            src="images/add.jpg"
            // className={isActive && classes.activeCourse}
            style={{ marginBottom: 10 }}
          />
          <Typography variant="subtitle2">Add New Course</Typography>
        </div>
      </ButtonBase>
    );
  };

  const CourseBtns = ({ data }) => {
    const imaage = "https://source.unsplash.com/random";
    return (
      <ButtonBase
        onClick={() => onSelectCourse(data)}
        className={classes.buttonBase}
      >
        <div className={clsx(classes.courseBtn)}>
          <img
            src={imaage}
            alt={data.courseName}
            // className={isActive && classes.activeCourse}
            style={{ marginBottom: 10 }}
          />
          <Typography variant="subtitle2">{data.courseName}</Typography>
        </div>
      </ButtonBase>
    );
  };

  const CourseMenu = () => {
    return (
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
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
      </StyledMenu>
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
        className={classes.root}
      >
        <PermissionGate scopes={[SCOPES.canCreate]}>
          {groups.length === 0 && (
            <Alert severity="info" variant="filled" style={{ marginBottom: 20 }}>Please create a group to add courses</Alert>
          )}
        </PermissionGate>

        {filteredCourses &&
          filteredCourses.length > 0 &&
          filteredCourses.map((c, index) => {
            const isActive = c.id === currentCourse?.id;

            return (
              <div
                style={{
                  position: "relative",
                  margin: '0 5px',
                  marginBottom: 20
                }}
                className={clsx(classes.courseBtnContainer, isActive && classes.activeCourse)}
              // className={classes.courseBtnContainer}
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
                      top: 0,
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
            <div
              style={{
                margin: '0 5px',
                marginBottom: 20
              }}
              className={classes.courseBtnContainer}
            >
              <AddNewCourse />
            </div>
          </PermissionGate>
        )}
      </Grid>
    </>
  );
};

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
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
}));

export default CoursesList;

