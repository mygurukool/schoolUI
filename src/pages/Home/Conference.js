import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { Fullscreen as Maximize, Minimize, HighlightOffTwoTone } from "@mui/icons-material";
import { useSelector } from "react-redux";
import useLanguages from "../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Conference = ({
  isSectionMaximized,
  isConferenceMaximized,
  toggleConferenceMinMax,
  handleLeaveConference,
}) => {
  const translate = useLanguages();
  const { currentCourse } = useSelector(state => state.common)

  return (
    <Grid item lg={isSectionMaximized ? 12 : 6} md={isSectionMaximized ? 12 : 6} sm={12} xs={12} sx={{ ...(!isSectionMaximized && { pl: { xs: 0, sm: 2 } }), mb: 1 }}>
      <Stack spacing={1} flexDirection="row" justifyContent="space-between" alignItems="center" mb={0.5}>
        <Typography variant="h6">{translate("CONFERENCE")} {currentCourse && `(${currentCourse.courseName})`}</Typography>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <IconButton color="primary" onClick={() => toggleConferenceMinMax()}>
            {isConferenceMaximized ? <Minimize /> : <Maximize />}
          </IconButton>
          <IconButton color="error" onClick={() => handleLeaveConference()}>
            <HighlightOffTwoTone />
          </IconButton>
        </Stack>
      </Stack>
      <div id="conference" />
    </Grid>
  );
};

export default Conference;
