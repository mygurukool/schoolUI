import React from "react";
import { makeStyles, styled } from "@mui/styles";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import ConferenceIcon from "@mui/icons-material/VideoCallTwoTone";

import { useSelector, useDispatch } from "react-redux";

import lang from "../../hooks/useLanguage";
import CoursesList from "./CourseList";
import SelectGroup from "./GroupSelector";
import AssignmentList from "./AssignmentList";
import LoadingContainer from "../../components/Spinner/LoadingContainer";
import clsx from "clsx";
import useModal from "../../hooks/useModal";
import TeacherAcceptModal from "../../components/Modals/TeacherAccept";

import checkIfUserIsTeacher from "../../helpers/checkIfUserIsTeacher";
import {
  removeUserAsTeacher,
  setUserAsTeacher,
} from "../../redux/action/userActions";
import useWhiteBoard from "../../hooks/useWhiteBoard";
import useConference from "../../hooks/useConference";

import { getAllCourses } from "../../redux/action/coursesActions";

import { deleteGroup, getAllGroups } from "../../redux/action/groupActions";
import BackgroundImage from "./BackgroundImage";
import TopSectionButtons from "./TopSectionButtons";
import WhiteBoard from "./WhiteBoard";
import Conference from "./Conference";
import PermissionsGate from "../../components/PermissionGate";
import { SCOPES } from "../../constants";
import MENUICON from "@mui/icons-material/MoreVert";
import { openModal } from "../../redux/action/utilActions";
import ADDICON from "@mui/icons-material/AddTwoTone";
import EDITICON from "@mui/icons-material/EditTwoTone";
import DELETEICON from "@mui/icons-material/DeleteTwoTone";
import INVITEICON from "@mui/icons-material/PersonAddAltTwoTone";
import DeleteModal from "../../components/Modals/DeleteModal";

const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginType = useSelector((state) => state.user.loginType);
  const { toggleButton } = useSelector(state => state.util)
  const {
    initializeWhiteBoard,

    whiteBoardUrl,
    isWhiteboardMaximized,
    toggleWhiteboardMinMax,
    handleLeaveWhiteboard,
  } = useWhiteBoard();

  const {
    initializeConference,
    isConfrenceOpen,
    conferenceData,
    isConferenceMaximized,
    toggleConferenceMinMax,
    handleLeaveConference,
  } = useConference();

  const {
    isCourseLoading,

    isAssignmentLoading,
  } = useSelector((state) => state.common);

  React.useEffect(() => {
    dispatch(getAllGroups());
    if (loginType !== "mygurukool") {
      dispatch(getAllCourses());
    }
  }, []);

  const shouldDivideSection = whiteBoardUrl || isConfrenceOpen;

  const isSectionMaximized = isWhiteboardMaximized || isConferenceMaximized;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentGroup, groups } = useSelector((state) => state.common);
  const open = Boolean(anchorEl);
  const deleteRef = React.useRef();
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
  const handleDelete = (data) => {
    // dispatch(openModal("group", data));
    dispatch(
      deleteGroup(data, () => {
        dispatch(getAllGroups());
      })
    );
  };

  const handleEdit = (data) => {
    dispatch(openModal("group", data));
    handleCloseMenu();
  };
  const handleInvite = (data) => {
    handleCloseMenu();
    dispatch(openModal("invitepeople"));
  };

  const GroupMenu = () => {
    return (
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleCloseMenu} >
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
      </StyledMenu>
    );
  };

  return (
    <>
      <TeacherAcceptModal />
      <PermissionsGate scopes={[SCOPES.CAN_DELETE_GROUP]}>
        <DeleteModal
          ref={deleteRef}
          getTitle={(g) => g?.groupName}
          onSubmit={(data) => handleDelete(data)}
        />
      </PermissionsGate>
      <div className={classes.root}>
        <BackgroundImage />
        <div className={classes.innerContainet}>
          <Container maxWidth={shouldDivideSection ? "xl" : "md"}>
            {/* top section */}
            <Grid container className={classes.container}>
              <Grid item lg={12}>
                <Grid container mb={2}>
                  <Grid item lg={3}>
                    <PermissionsGate
                      scopes={[SCOPES.CAN_VIEW_GROUP]}
                      exceptionLogin={"google"}
                    >
                      <SelectGroup />
                    </PermissionsGate>
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                    lg={9}
                  >

                    {toggleButton && <TopSectionButtons
                      initializeWhiteBoard={initializeWhiteBoard}
                      initializeConference={initializeConference}
                    />}
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
                  </Grid>
                </Grid>
              </Grid>
              <PermissionsGate
                scopes={[SCOPES.CAN_VIEW_COURSE]}
                exceptionLogin={"google"}
              >
                {!isSectionMaximized && (
                  <LoadingContainer isLoading={isCourseLoading}>
                    <CoursesList />
                  </LoadingContainer>
                )}
              </PermissionsGate>
            </Grid>

            {/* middle section */}
            <Grid
              container
              className={clsx(classes.container, classes.middleContainer)}
            >
              <PermissionsGate
                scopes={[SCOPES.CAN_VIEW_ASSIGNMENT]}
                exceptionLogin={"google"}
              >
                {!isSectionMaximized && (
                  <Grid item lg={shouldDivideSection ? 6 : 12}>
                    <LoadingContainer isLoading={isAssignmentLoading}>
                      <AssignmentList />
                    </LoadingContainer>
                  </Grid>
                )}
              </PermissionsGate>
              <PermissionsGate
                scopes={[SCOPES.CAN_VIEW_WHITEBOARD]}
                exceptionLogin={"google"}
              >
                {!isConfrenceOpen && whiteBoardUrl && (
                  <WhiteBoard
                    isSectionMaximized={isSectionMaximized}
                    isWhiteboardMaximized={isWhiteboardMaximized}
                    toggleWhiteboardMinMax={toggleWhiteboardMinMax}
                    handleLeaveWhiteboard={handleLeaveWhiteboard}
                    whiteBoardUrl={whiteBoardUrl}
                  />
                )}
              </PermissionsGate>
              <PermissionsGate
                scopes={[SCOPES.CAN_VIEW_CONFERENCE]}
                exceptionLogin={"google"}
              >
                {isConfrenceOpen && (
                  <Conference
                    isSectionMaximized={isSectionMaximized}
                    isConferenceMaximized={isConferenceMaximized}
                    toggleConferenceMinMax={toggleConferenceMinMax}
                    handleLeaveConference={handleLeaveConference}
                  />
                )}
              </PermissionsGate>
            </Grid>
          </Container>
        </div>
      </div>
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
}));

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    minHeight: "100vh",
    maxHeight: "100%",
    overflow: "hidden",
  },
  innerContainet: {
    height: "100%",
    width: "100%",
    overflowY: "auto",
  },

  container: {
    width: "100%",
    height: "auto",
    background: "white",
    borderRadius: theme.palette.radius.base,
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.2)',
    // boxShadow: "0px 2px 5px -1px rgba(0,0,0,0.2)",
    padding: theme.spacing(3, 2.5, 0, 2.5),
  },
  subjectContainer: {
    display: "flex",
    flexDirection: "coumn",
    justifyContent: "flex-start",
  },

  assignmentContainer: {
    maxHeight: "50vh",
    overflowY: "auto",
  },
  between: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    marginBottom: theme.spacing(1),
  },
  middleContainer: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3, 2.5),
  },
}));
