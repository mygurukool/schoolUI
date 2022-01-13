/*global JitsiMeetExternalAPI*/

import React, { useCallback } from "react";
import { BASEURL, SCOPES, SOCKETURL } from "../constants";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { usePermissions } from "../components/PermissionGate";

let socket;

const useConference = () => {
  const currentCourse = useSelector((state) => state.common.currentCourse);
  const {
    id: userId,
    isTeacher,
    name: userName,
  } = useSelector((state) => state.user);
  const canCreateConference = usePermissions({
    scopes: [SCOPES.CAN_CREATE_CONFERENCE],
    exceptionLogin: "google",
  });

  const courseId = currentCourse?._id || currentCourse?.id;

  const [isConfrenceOpen, setIsConferenceOpen] = React.useState(false);
  const [isConferenceMaximized, setIsConferenceMaximized] =
    React.useState(false);

  const [conferenceData, setConferenceData] = React.useState();

  const intializeSocket = (data) => {
    socket = socketIOClient(SOCKETURL, {
      query: { data },
    });

    socket.on("connect", async () => {
      socket.emit("JOIN_CONFERENCE_ROOM", courseId);
    });
  };

  //methos
  const handleUpComingConference = async (data) => {
    console.log("data", data);
    setIsConferenceOpen(true);
    setTimeout(() => {
      const domain = "meet.jit.si";
      const options = {
        roomName: data.roomName,
        height: 580,
        id: data.id,
        parentNode: document.getElementById("conference"),
        interfaceConfigOverwrite: {
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false,
        },
        configOverwrite: {
          disableSimulcast: false,
        },
      };

      const api = new JitsiMeetExternalAPI(domain, options);
      api.addEventListener("videoConferenceJoined", (data) => {
        api.executeCommand("displayName", userName);
      });
      api.addEventListener("videoConferenceLeft", (data) => {
        setConferenceData();
        setIsConferenceOpen(false);
        // socket.emit("INITIALIZE_CONFERENCE", { courseId, ...data });

        // api.executeCommand("displayName", userName);
      });
    }, 1000);
  };

  const toggleConferenceMinMax = () => {
    setIsConferenceMaximized(!isConferenceMaximized);
  };

  const handleLeaveConference = () => {
    setIsConferenceOpen(false);
    setConferenceData();
  };

  const initializeConference = async () => {
    if (canCreateConference)
      try {
        setIsConferenceOpen(true);
        setTimeout(() => {
          const domain = "meet.jit.si";
          const options = {
            roomName: "GuruKoolSchoolVideoConference",
            height: 580,
            parentNode: document.getElementById("conference"),
            interfaceConfigOverwrite: {
              filmStripOnly: false,
              SHOW_JITSI_WATERMARK: false,
            },
            configOverwrite: {
              disableSimulcast: false,
            },
          };

          const api = new JitsiMeetExternalAPI(domain, options);
          api.addEventListener("videoConferenceJoined", (data) => {
            // console.log("Local User Joined", data, api);

            socket.emit("INITIALIZE_CONFERENCE", { courseId, ...data });

            api.executeCommand("displayName", userName);
          });
          api.addEventListener("videoConferenceLeft", (data) => {
            setConferenceData();
            setIsConferenceOpen(false);
          });
        }, 1000);

        // api.addEventListener("", (data) => {
        //   // console.log("Local User Joined", data, api);

        //   socket.emit("INITIALIZE_CONFERENCE", {
        //     courseId: courseId || "dummy",
        //     ...data,
        //   });

        //   api.executeCommand("displayName", userName);
        // });
      } catch (error) {
        console.error("Failed to load Jitsi API", error);
      }
  };

  React.useEffect(() => {
    if (courseId) {
      intializeSocket({ courseId, userId });
      socket.on("SET_CONFERENCE", handleUpComingConference);
    }
  }, [courseId]);

  console.log("current", conferenceData);

  return {
    initializeConference,
    conferenceData,
    isConfrenceOpen,
    isConferenceMaximized,
    handleLeaveConference,
    toggleConferenceMinMax,
  };
};

export default useConference;
