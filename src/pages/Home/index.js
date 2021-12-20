import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  ButtonBase,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ConferenceIcon from "@mui/icons-material/VideoCallTwoTone";

import { useSelector, useDispatch } from "react-redux";

import {
  getAllCourses,
  getAssignments,
} from "../../redux/action/coursesActions";
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
import AddChatUsersModal from "../../components/Modals/AddChatUsersModal";

const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    open: teacherPromt,
    openModal: openTeacherPrompt,
    closeModal: closeTeacherPrompt,
  } = useModal();

  const [isConfrence, setIsConference] = React.useState(false);

  const {
    courses,
    groups,
    assignments,
    isCourseLoading,
    teachers,
    students,
    isGroupsLoading,
    isAssignmentLoading,
  } = useSelector((state) => state.common);
  const { loginType, sectionBg, id, isTeacher } = useSelector(
    (state) => state.user
  );

  React.useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  React.useEffect(() => {
    const founData = checkIfUserIsTeacher(id, teachers);
    if (founData) {
      openTeacherPrompt();
    }
  }, [teachers]);

  const onSelectCourse = (c) => {
    dispatch(removeUserAsTeacher());

    dispatch(getAssignments(c._id || c.id));
  };

  const onApproveAsTeacher = () => {
    closeTeacherPrompt(false);

    dispatch(setUserAsTeacher());
  };

  return (
    <>
      <TeacherAcceptModal
        open={teacherPromt}
        onClose={() => closeTeacherPrompt()}
        onSubmit={() => onApproveAsTeacher()}
      />

      <div className={classes.root}>
        <div className={classes.bgContainer}>
          <div className={classes.bg} />
          <div
            className={classes.sectionBg}
            style={{
              backgroundImage: `url(${sectionBg})`,
            }}
          />
        </div>
        <div className={classes.innerContainet}>
          <Container maxWidth={isConfrence ? "xl" : "md"}>
            {/* top section */}
            <Grid container className={classes.container}>
              <Grid item lg={12}>
                <Grid container mb={2}>
                  <Grid item lg={2}>
                    <SelectGroup groups={groups} />
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                    lg={10}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<ConferenceIcon />}
                      onClick={() => {
                        setIsConference(!isConfrence);
                      }}
                      style={{ marginRight: 10 }}
                    >
                      {lang("conference")}
                    </Button>

                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<ConferenceIcon />}
                      onClick={() => {}}
                    >
                      {lang("conference")}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoadingContainer isLoading={isCourseLoading}>
                  <CoursesList
                    courses={courses}
                    onSelectCourse={onSelectCourse}
                  />
                </LoadingContainer>
              </Grid>
            </Grid>

            {/* middle section */}
            <Grid
              container
              className={clsx(classes.container, classes.middleContainer)}
            >
              <Grid item lg={isConfrence ? 6 : 12}>
                <LoadingContainer isLoading={isAssignmentLoading}>
                  <AssignmentList assignments={assignments} />
                </LoadingContainer>
              </Grid>
              {isConfrence && (
                <Grid item lg={6}>
                  <Card>
                    <CardContent>confrenece</CardContent>
                  </Card>
                </Grid>
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

  bgContainer: {
    position: "absolute",
    height: "100%",
    left: 0,
    zIndex: -1,
    top: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  bg: {
    // backgroundColor: '#4158D0',
    background: theme.palette.primary.main,
    // backgroundColor: '#4158D0',
    backgroundImage: "url(background/bg1.png)",
    backgroundSize: "cover",
    flex: 1,
    height: 180,
  },
  sectionBg: {
    // backgroundColor: '#4158D0',
    // background: theme.palette.secondary.main,
    // backgroundColor: '#4158D0',
    // backgroundImage: "url(background/bg1.png)",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",

    flex: 3,

    width: "100%",
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
