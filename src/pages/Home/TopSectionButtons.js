import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Stack } from "@mui/material";
import lang from "../../hooks/useLanguage";
import ConferenceIcon from "@mui/icons-material/VideoCallTwoTone";
import PermissionsGate from "../../components/PermissionGate";
import { SCOPES } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TopSectionButtons = ({ initializeWhiteBoard, initializeConference }) => {
  const classes = useStyles();
  return (
    <Stack direction="row" space="2">
      <PermissionsGate
        scopes={[SCOPES.CAN_VIEW_WHITEBOARD]}
        exceptionLogin={"google"}
      >
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
      </PermissionsGate>
      <PermissionsGate
        scopes={[SCOPES.CAN_VIEW_CONFERENCE]}
        exceptionLogin={"google"}
      >
        <Button
          color="primary"
          variant="contained"
          startIcon={<ConferenceIcon />}
          onClick={() => initializeConference()}
        >
          {lang("conference")}
        </Button>
      </PermissionsGate>
    </Stack>
  );
};

export default TopSectionButtons;
