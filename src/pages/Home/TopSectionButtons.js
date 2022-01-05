import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Stack } from "@mui/material";
import lang from "../../hooks/useLanguage";
import ConferenceIcon from "@mui/icons-material/VideoCallTwoTone";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TopSectionButtons = ({ initializeWhiteBoard, initializeConference }) => {
  const classes = useStyles();
  return (
    <Stack direction="row" space="2">
      <Button
        color="primary"
        variant="contained"
        startIcon={<ConferenceIcon />}
        onClick={() => {
          initializeWhiteBoard();
        }}
        style={{ marginRight: 10 }}
      >
        White Board
      </Button>

      <Button
        color="primary"
        variant="contained"
        startIcon={<ConferenceIcon />}
        onClick={() => initializeConference()}
      >
        {lang("conference")}
      </Button>
    </Stack>
  );
};

export default TopSectionButtons;
