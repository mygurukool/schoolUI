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

const Conference = ({
  isSectionMaximized,
  isConferenceMaximized,
  toggleConferenceMinMax,
  handleLeaveConference,
}) => {
  const classes = useStyles();
  return (
    <Grid item lg={isSectionMaximized ? 12 : 6}>
      <Card>
        <CardHeader
          title="Conference"
          action={
            <Stack direction="row">
              <IconButton onClick={() => toggleConferenceMinMax()}>
                {isConferenceMaximized ? <Minimize /> : <Maximize />}
              </IconButton>
              <IconButton onClick={() => handleLeaveConference()}>
                <Close />
              </IconButton>
            </Stack>
          }
        />
        <CardContent>
          <div id="conference" />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Conference;
