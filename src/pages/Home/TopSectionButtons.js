import React from "react";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/material";
import lang from "../../hooks/useLanguage";
import ConferenceIcon from "@mui/icons-material/PeopleAltTwoTone";
import PermissionsGate from "../../components/PermissionGate";
import { SCOPES } from "../../constants";
// import Whiteboard from "../../assets/icons/Whiteboard";
// import Conference from "../../assets/icons/Conference";
import VideoLabelTwoToneIcon from '@mui/icons-material/VideoLabelTwoTone';
import AppButton from "../../components/AppButton";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const TopSectionButtons = ({ initializeWhiteBoard, initializeConference }) => {
  const classes = useStyles();
  const { currentCourse } = useSelector(state => state.common)

  return (
    <Stack direction="row" space="2">

      <PermissionsGate
        scopes={[SCOPES.CAN_VIEW_WHITEBOARD]}
        exceptionLogin={"google"}
      >
        {/* <Button
            color="primary"
            variant="contained"
            // startIcon={<ConferenceIcon />}
            startIcon={<Whiteboard color="white" />}
            onClick={() => {
              initializeWhiteBoard();
            }}
            sx={{
              marginRight: 1,

            }}
          >
            White Board
          </Button> */}
        <AppButton
          color="primary"
          variant="contained"
          startIcon={<VideoLabelTwoToneIcon />}
          disabled={!currentCourse}
          // startIcon={<Whiteboard color="white" />}
          onClick={() => {
            initializeWhiteBoard();
          }}
          sx={{
            marginRight: 1,

          }}
        >
          White Board
        </AppButton>

      </PermissionsGate>
      <PermissionsGate
        scopes={[SCOPES.CAN_VIEW_CONFERENCE]}
        exceptionLogin={"google"}
      >
        <AppButton
          color="secondary"
          variant="contained"
          disabled={!currentCourse}
          // startIcon={<Conference color="white" />}
          startIcon={<ConferenceIcon />}
          onClick={() => initializeConference()}

        >
          {lang("conference")}
        </AppButton>

      </PermissionsGate>

      {/* 

      <Box
        sx={{
          display: {
            xs: 'block', sm: 'none'
          }
        }}
      >
        <PermissionsGate
          scopes={[SCOPES.CAN_VIEW_WHITEBOARD]}
          exceptionLogin={"google"}
        >
          <IconButton
            color="primary"
            variant="contained"
            // startIcon={<ConferenceIcon />}
            onClick={() => {
              initializeWhiteBoard();
            }}

          >
            <Whiteboard />
          </IconButton>
        </PermissionsGate>
        <PermissionsGate
          scopes={[SCOPES.CAN_VIEW_CONFERENCE]}
          exceptionLogin={"google"}
        >
          <IconButton
            color="secondary"
            onClick={() => initializeConference()}

          >
            <ConferenceIcon />
          </IconButton>
        </PermissionsGate>
      </Box> */}
    </Stack>
  );
};

export default TopSectionButtons;
