import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Fullscreen as Maximize, Minimize, HighlightOffTwoTone } from "@mui/icons-material";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const WhiteBoard = ({
  isSectionMaximized,
  isWhiteboardMaximized,
  toggleWhiteboardMinMax,
  handleLeaveWhiteboard,
  whiteBoardUrl,
}) => {
  const { currentCourse } = useSelector(state => state.common)
  return (
    <Grid item lg={isSectionMaximized ? 12 : 6} md={isSectionMaximized ? 12 : 6} sm={12} xs={12} sx={{ ...(!isSectionMaximized && { pl: { xs: 0, sm: 2 } }), mb: 1 }}>

      <Stack spacing={1} flexDirection="row" justifyContent="space-between" alignItems="center" mb={0.5}>
        <Typography variant="h6">Whiteboard {currentCourse && `(${currentCourse.courseName})`}</Typography>
        <div>
          <IconButton color="primary" onClick={() => toggleWhiteboardMinMax()}>
            {isWhiteboardMaximized ? <Minimize /> : <Maximize />}
          </IconButton>
          <IconButton color="error" onClick={() => handleLeaveWhiteboard()}>
            <HighlightOffTwoTone />
          </IconButton>
        </div>
      </Stack>
      <iframe
        src={whiteBoardUrl}
        width="100%"
        height="500px"
        title="W3Schools Free Online Web Tutorials"
      ></iframe>
    </Grid>
  );
};

export default WhiteBoard;
