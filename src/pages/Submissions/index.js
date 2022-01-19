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
} from "@mui/material";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSubmission } from "../../redux/action/assignmentActions";
import FileCard from "../Home/FileCard";
import { giveMarks } from "../../redux/action/teacherActions";

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
  const classes = useStyles();
  const { id } = useParams();
  const [currentStudent, setCurrentStudent] = React.useState();
  const [points, setPoints] = React.useState();

  const submission = useSelector((state) => state.common.submission);

  const students = submission?.students;

  const handleStudentClick = (s) => {
    if (s.points) {
      setPoints(s.points);
    }
    setCurrentStudent(s);
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
    if (id) {
      dispatch(getSubmission(id));
    }
  }, [id]);

  return (
    <div className={classes.root}>
      <Grid container direction="row">
        <Grid item lg={3} className={classes.studentList}>
          <List>
            {students?.map((s, si) => {
              if (s)
                return (
                  <ListItem>
                    <ListItemButton onClick={() => handleStudentClick(s)}>
                      <ListItemText primary={s.name} secondary={s.email} />
                    </ListItemButton>
                  </ListItem>
                );
            })}
          </List>
        </Grid>
        {currentStudent && (
          <Grid item lg={9}>
            {currentStudent?.uploadExercises?.map((a, ai) => {
              return <FileCard assignmentId={id} key={ai} {...a} />;
            })}

            <Stack>
              <TextField
                variant="outlined"
                value={points}
                type="number"
                label="Points"
                placeholder="Enter marks"
                onChange={(e) => setPoints(e.target.value)}
              />

              <Button
                variant="contained"
                onClick={() => onSubmit()}
                disabled={!points}
              >
                Submit
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Submissions;
