import React from "react";
import { makeStyles } from "@mui/styles";
import { ButtonBase, Typography } from "@mui/material";
import clsx from "clsx";

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
}));

const CoursesList = ({ courses, onSelectCourse, currentCourse }) => {
  const classes = useStyles();

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
          alt={data.name}
          className={isActive && classes.activeCourse}
          style={{ marginBottom: 10 }}
        />
        <Typography variant="body2">{data.name}</Typography>
      </ButtonBase>
    );
  };
  return (
    courses &&
    courses.length > 0 &&
    courses.map((c, index) => {
      return <CourseBtns data={c} />;
    })
  );
};

export default CoursesList;
