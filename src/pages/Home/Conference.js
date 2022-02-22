import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { AspectRatio as Maximize, Minimize, Close } from "@mui/icons-material";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Conference = ({
  isSectionMaximized,
  isConferenceMaximized,
  toggleConferenceMinMax,
  handleLeaveConference,
}) => {
  const classes = useStyles();
  const { currentCourse } = useSelector(state => state.common)

  return (
    <Grid item lg={isSectionMaximized ? 12 : 6} md={isSectionMaximized ? 12 : 6} sm={12} xs={12} sx={{ ...(!isSectionMaximized && { pl: { xs: 0, sm: 2 } }), mb: 1 }}>
      <Stack spacing={1} flexDirection="row" justifyContent="space-between" alignItems="center" mb={0.5}>
        <Typography variant="h6">Conference {currentCourse && `(${currentCourse.courseName})`}</Typography>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <IconButton color="primary" onClick={() => toggleConferenceMinMax()}>
            {isConferenceMaximized ? <Minimize /> : <Maximize />}
          </IconButton>
          <IconButton color="error" onClick={() => handleLeaveConference()}>
            <Close />
          </IconButton>
        </Stack>
      </Stack>
      <div id="conference" />
    </Grid>
  );
};

export default Conference;
