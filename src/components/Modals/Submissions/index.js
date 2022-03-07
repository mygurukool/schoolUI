/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Button,
  Drawer,
  Box,
  Toolbar,
  Divider,
  ListSubheader,
  Typography,
  Alert,
  Card,
  CardContent,
  ListItemIcon,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSubmission } from "../../../redux/action/assignmentActions";
import FileCard from "../../../pages/Home/FileCard";
import { giveMarks } from "../../../redux/action/teacherActions";
import NavBar from "../../Navbar";
import { ArrowBack } from "@mui/icons-material";
import ModalContainer from "../../ModalContainer";
import { closeSubmissionModal } from "../../../redux/action/utilActions";
import useLanguages from "../../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
  },
  studentList: {
    height: "100vh",
    borderRight: "1px solid black",
  },
}));

const Submissions = (props) => {
  const dispatch = useDispatch();
  const translate = useLanguages();
  const classes = useStyles();
  const [currentStudent, setCurrentStudent] = React.useState();
  const [points, setPoints] = React.useState();

  const { currentGroup, currentCourse, submission } = useSelector(
    (state) => state.common
  );
  const { submissionModalOpen, submissionModalData: assignment } = useSelector(
    (state) => state.util
  );
  const open = submissionModalOpen === "submission";

  const id = assignment?.id || assignment?._id;
  const students = submission?.students;

  console.log("assignment", assignment, submission);
  const handleStudentClick = (s) => {
    if (s.points) {
      setPoints(s.points);
    }
    setCurrentStudent(s);
  };

  const handleClose = () => {
    dispatch(closeSubmissionModal());
  };
  const onSubmit = () => {
    dispatch(
      giveMarks(
        {
          assignmentId: id,
          studentId: currentStudent?._id || currentStudent?.id,
          points: points,
        },
        () => {
          setPoints();
        }
      )
    );
  };

  React.useEffect(() => {
    if (id && open) {
      dispatch(getSubmission(id));
    }
  }, [id, open]);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      onClick={() => handleClose()}
    >
      {currentGroup?.groupName}
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      onClick={() => handleClose()}
    >
      {currentCourse?.courseName}
    </Link>,
    <Typography key="3" color="text.primary">
      {submission?.assignmentTitle}
    </Typography>,
  ];

  // console.log("submission", submission);
  return (
    <ModalContainer
      open={open}
      onClose={handleClose}
      title={submission?.assignmentTitle}
      size="sm"
      fullScreen
      hideButtons
    >
      <Box sx={{ display: "flex" }} className={classes.root}>
        <Drawer
          variant="permanent"
          sx={{
            width: 300,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 300, boxSizing: "border-box" },
          }}
        >
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem button onClick={() => handleClose()}>
                <ListItemIcon>
                  <ArrowBack />
                </ListItemIcon>
                <ListItemText primary={translate("BACK_TO_SUBJECTS")} />
              </ListItem>
            </List>
            <Divider />
            <List
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {translate("STUDENTS")}
                </ListSubheader>
              }
            >
              {students?.map((s, si) => {
                const isFistItem = si === 0;
                const isLastItem = students.length - 1 === si;

                if (s)
                  return (
                    <>
                      {isFistItem && <Divider />}
                      <ListItem
                        button
                        onClick={() => handleStudentClick(s)}
                        key={si}
                      >
                        <ListItemText primary={s.name} secondary={s.email} />
                      </ListItem>
                      {isLastItem && <Divider />}
                    </>
                  );
              })}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box mb={3}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Box>

          {!currentStudent ? (
            <Alert severity="warning">
              {translate("PLEASE_SELECT_STUDENT")}
            </Alert>
          ) : (
            <Grid container>
              <Grid item lg={9}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {translate("FILE")}
                    </Typography>
                    {currentStudent?.uploadExercises?.map((a, ai) => {
                      return <FileCard assignmentId={id} key={ai} {...a} />;
                    })}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={5} mt={5}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      mb={2}
                      color="text.secondary"
                      gutterBottom
                    >
                      {translate("MARKS")}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        variant="outlined"
                        value={points}
                        type="number"
                        label={translate("POINTS")}
                        placeholder={translate("ENTER_MARKS")}
                        onChange={(e) => setPoints(e.target.value)}
                      />

                      <Button
                        variant="contained"
                        onClick={() => onSubmit()}
                        disabled={!points}
                      >
                        {translate("SAVE")}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default Submissions;
