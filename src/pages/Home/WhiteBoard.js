import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { AspectRatio as Maximize, Minimize, Close } from "@mui/icons-material";

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
  return (
    <Grid item lg={isSectionMaximized ? 12 : 6}>
      <Card>
        <CardHeader
          title="Whiteboard"
          action={
            <Stack direction="row">
              <IconButton onClick={() => toggleWhiteboardMinMax()}>
                {isWhiteboardMaximized ? <Minimize /> : <Maximize />}
              </IconButton>
              <IconButton onClick={() => handleLeaveWhiteboard()}>
                <Close />
              </IconButton>
            </Stack>
          }
        />
        <CardContent>
          <iframe
            src={whiteBoardUrl}
            width="100%"
            height="500px"
            title="W3Schools Free Online Web Tutorials"
          ></iframe>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WhiteBoard;
