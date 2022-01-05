import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Stack,
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

import { getAllGroups } from "../../redux/action/groupActions";
import BackgroundImage from "./BackgroundImage";
import TopSectionButtons from "./TopSectionButtons";
import WhiteBoard from "./WhiteBoard";
import Conference from "./Conference";

const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    dispatch(getAllCourses());
    dispatch(getAllGroups());
  }, []);

  const shouldDivideSection = whiteBoardUrl || isConfrenceOpen;

  const isSectionMaximized = isWhiteboardMaximized || isConferenceMaximized;

  return (
    <>
      <TeacherAcceptModal />

      <div className={classes.root}>
        <BackgroundImage />
        <div className={classes.innerContainet}>
          <Container maxWidth={shouldDivideSection ? "xl" : "md"}>
            {/* top section */}
            <Grid container className={classes.container}>
              <Grid item lg={12}>
                <Grid container mb={2}>
                  <Grid item lg={3}>
                    <SelectGroup />
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                    lg={9}
                  >
                    <TopSectionButtons
                      initializeWhiteBoard={initializeWhiteBoard}
                      initializeConference={initializeConference}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {!isSectionMaximized && (
                <LoadingContainer isLoading={isCourseLoading}>
                  <CoursesList />
                </LoadingContainer>
              )}
            </Grid>

            {/* middle section */}
            <Grid
              container
              className={clsx(classes.container, classes.middleContainer)}
            >
              {!isSectionMaximized && (
                <Grid item lg={shouldDivideSection ? 6 : 12}>
                  <LoadingContainer isLoading={isAssignmentLoading}>
                    <AssignmentList />
                  </LoadingContainer>
                </Grid>
              )}
              {!isConfrenceOpen && whiteBoardUrl && (
                <WhiteBoard
                  isSectionMaximized={isSectionMaximized}
                  isWhiteboardMaximized={isWhiteboardMaximized}
                  toggleWhiteboardMinMax={toggleWhiteboardMinMax}
                  handleLeaveWhiteboard={handleLeaveWhiteboard}
                  whiteBoardUrl={whiteBoardUrl}
                />
              )}

              {isConfrenceOpen && (
                <Conference
                  isSectionMaximized={isSectionMaximized}
                  isConferenceMaximized={isConferenceMaximized}
                  toggleConferenceMinMax={toggleConferenceMinMax}
                  handleLeaveConference={handleLeaveConference}
                />
              )}
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    minHeight: "90vh",
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
    boxShadow: "0px 2px 5px -1px rgba(0,0,0,0.2)",
    padding: theme.spacing(2),
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
  },
}));
