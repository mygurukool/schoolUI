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
import useLanguages from "../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  iframe: {
    border: `1px solid ${theme.palette.gray[700]}`,
    borderRadius: theme.spacing(0.5)
  },
}));

const WhiteBoard = ({
  isSectionMaximized,
  isWhiteboardMaximized,
  toggleWhiteboardMinMax,
  handleLeaveWhiteboard,
  whiteBoardUrl,
}) => {
  const { currentCourse } = useSelector(state => state.common)
  const translate = useLanguages()
  const classes = useStyles()
  return (
    <Grid item lg={isSectionMaximized ? 12 : 6} md={isSectionMaximized ? 12 : 6} sm={12} xs={12} sx={{ ...(!isSectionMaximized && { pl: { xs: 0, sm: 2 } }), mb: 1 }}>

      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" mb={0.5}>
        <Typography variant="h6">{translate("WHITE_BOARD")} {currentCourse && `(${currentCourse.courseName})`}</Typography>
        <Box>
          <IconButton color="primary" onClick={() => toggleWhiteboardMinMax()}>
            {isWhiteboardMaximized ? <Minimize /> : <Maximize />}
          </IconButton>
          <IconButton color="error" onClick={() => handleLeaveWhiteboard()}>
            <HighlightOffTwoTone />
          </IconButton>
        </Box>
      </Stack>
      <iframe
        src={whiteBoardUrl}
        width="100%"
        height="500px"
        frameBorder={0}
        className={classes.iframe}
      ></iframe>
    </Grid>
  );
};

export default WhiteBoard;
