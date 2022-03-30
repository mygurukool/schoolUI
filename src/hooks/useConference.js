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
  });

  const courseId = currentCourse?._id || currentCourse?.id;

  const [isConfrenceOpen, setIsConferenceOpen] = React.useState(false);
  const [isConferenceMaximized, setIsConferenceMaximized] =
    React.useState(false);

  const [conferenceData, setConferenceData] = React.useState();

  const intializeSocket = (data) => {
    socket = socketIOClient(`${SOCKETURL}`, {
      query: { ...data, path: "conference" },
    });
  };

  //methos
  const handleUpComingConference = async (data) => {
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
      });
    }, 1000);
  };

  const toggleConferenceMinMax = () => {
    setIsConferenceMaximized(!isConferenceMaximized);
  };

  const handleLeaveConference = () => {
    setIsConferenceOpen(false);
    setConferenceData();
    setIsConferenceMaximized(false);
  };

  const initializeConference = async () => {
    if (canCreateConference && !isConfrenceOpen)
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
            handleLeaveConference();
          });
        }, 1000);
      } catch (error) {
        console.error("Failed to load Jitsi API", error);
      }
  };

  React.useEffect(() => {
    if (courseId) {
      intializeSocket({ courseId, userId });
      if (socket) {
        socket.on("SET_CONFERENCE", handleUpComingConference);
      }
    }
  }, [courseId]);

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

//better but working in effect
// /*global JitsiMeetExternalAPI*/

// import React, { useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { usePermissions } from "../components/PermissionGate";
// import { SCOPES } from "../constants";
// import socketIOClient from "socket.io-client";
// import { SOCKETURL } from "../constants";

// const useConference = () => {
//   const currentCourse = useSelector((state) => state.common.currentCourse);
//   const {
//     id: userId,
//     isTeacher,
//     name: userName,
//   } = useSelector((state) => state.user);
//   const canCreateConference = usePermissions({
//     scopes: [SCOPES.CAN_CREATE_CONFERENCE],
//   });
//   const courseId = currentCourse?._id || currentCourse?.id;

//   const [isConfrenceOpen, setIsConferenceOpen] = useState(false);
//   const [isConferenceMaximized, setIsConferenceMaximized] = useState(false);

//   const [conferenceData, setConferenceData] = useState();
//   const socketRef = useRef();
//   React.useEffect(() => {
//     if (courseId) {
//       socketRef.current = socketIOClient(`${SOCKETURL}/chat`, {
//         query: { courseId, userId },
//         reconnection: false,
//       });
//       socketRef.current.on("SET_CONFERENCE", handleUpComingConference);
//     }
//     return () => {
//       socketRef.current &&
//         socketRef.current.off("SET_CONFERENCE", handleUpComingConference);
//     };
//   }, [courseId]);

//   const initializeConference = async () => {
//     if (!socketRef.current) {
//       alert("An Error occured");
//       return;
//     }
//     if (canCreateConference && !isConfrenceOpen)
//       try {
//         setIsConferenceOpen(true);
//         setTimeout(() => {
//           const domain = "meet.jit.si";
//           const options = {
//             roomName: `${currentCourse.courseName}${courseId}${userId}`,
//             height: 580,
//             parentNode: document.getElementById("conference"),
//             interfaceConfigOverwrite: {
//               filmStripOnly: false,
//               SHOW_JITSI_WATERMARK: false,
//             },
//             configOverwrite: {
//               disableSimulcast: false,
//             },
//           };

//           const api = new JitsiMeetExternalAPI(domain, options);
//           api.addEventListener("videoConferenceJoined", (data) => {
//             // console.log("Local User Joined", data, api);

//             socketRef.current.emit("INITIALIZE_CONFERENCE", {
//               courseId,
//               ...data,
//             });

//             api.executeCommand("displayName", userName);
//           });
//           api.addEventListener("videoConferenceLeft", (data) => {
//             handleLeaveConference();
//           });
//         }, 1000);
//       } catch (error) {
//         console.error("Failed to load Jitsi API", error);
//       }
//   };

//   const handleUpComingConference = async (data) => {
//     setIsConferenceOpen(true);
//     setTimeout(() => {
//       const domain = "meet.jit.si";
//       const options = {
//         roomName: data.roomName,
//         height: 580,
//         id: data.id,
//         parentNode: document.getElementById("conference"),
//         interfaceConfigOverwrite: {
//           filmStripOnly: false,
//           SHOW_JITSI_WATERMARK: false,
//         },
//         configOverwrite: {
//           disableSimulcast: false,
//         },
//       };

//       const api = new JitsiMeetExternalAPI(domain, options);
//       api.addEventListener("videoConferenceJoined", (data) => {
//         api.executeCommand("displayName", userName);
//       });
//       api.addEventListener("videoConferenceLeft", (data) => {
//         setConferenceData();
//         setIsConferenceOpen(false);
//         // socket.emit("INITIALIZE_CONFERENCE", { courseId, ...data });

//         // api.executeCommand("displayName", userName);
//       });
//     }, 1000);
//   };

//   const toggleConferenceMinMax = () => {
//     setIsConferenceMaximized(!isConferenceMaximized);
//   };

//   const handleLeaveConference = () => {
//     setIsConferenceOpen(false);
//     setConferenceData();
//     setIsConferenceMaximized(false);
//   };

//   return {
//     initializeConference,
//     conferenceData,
//     isConfrenceOpen,
//     isConferenceMaximized,
//     handleLeaveConference,
//     toggleConferenceMinMax,
//   };
// };
// export default useConference;
