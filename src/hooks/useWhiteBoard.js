import React, { useCallback } from "react";
import { BASEURL, DATEFORMAT, SCOPES, SOCKETURL } from "../constants";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessages,
  setSingleMessage,
  cleanMessages,
  setOlderMessages,
} from "../redux/action/messageAction";
import { usePermissions } from "../components/PermissionGate";
import moment from "moment";
let socket;

const useWhiteBoard = () => {
  const { currentCourse, currentGroup } = useSelector((state) => state.common);

  const {
    id: userId,
    isTeacher,
    name: userName,
    loginType,
    organization,
    isGoogleLogin,
    isMicrosoftLogin,
  } = useSelector((state) => state.user);

  const generateOrgName = () => {
    if (isGoogleLogin) {
      return "googleclassroom";
    } else if (isMicrosoftLogin) {
      return "msteams";
    } else if (organization) {
      return organization?.organizationName.replace(/[^a-zA-Z ]/g, "");
    } else {
      return "mygurukool";
    }
  };

  const canCreateWhiteboard = usePermissions({
    scopes: [SCOPES.CAN_CREATE_WHITEBOARD],
    exceptionLogin: "google",
  });

  const courseId = currentCourse?._id || currentCourse?.id;

  // const [messages, setMessages] = React.useState([]);
  const [whiteBoardUrl, setWhiteBoardUrl] = React.useState();
  const [isWhiteboardMaximized, setIsWhiteboardMaximized] =
    React.useState(false);
  const intializeSocket = (data) => {
    socket = socketIOClient(SOCKETURL, {
      query: { data },
      transports: ['websocket']
    });

    socket.on("connect", async () => {
      socket.emit("JOIN_WHITEBOARD_ROOM", courseId);
    });
  };

  //methos

  const toggleWhiteboardMinMax = () => {
    setIsWhiteboardMaximized(!isWhiteboardMaximized);
  };

  const handleLeaveWhiteboard = () => {
    setWhiteBoardUrl();
    setIsWhiteboardMaximized(false);
  };

  const initializeWhiteBoard = () => {
    if (canCreateWhiteboard) {
      const orgName = generateOrgName();
      const url = `https://wbo.ophir.dev/boards/${orgName}${currentGroup?.groupName
        }${moment().format(`DDMMYYYY`)}`;
      if (isTeacher) {
        socket.emit("CREATE_WHITEBOARD", {
          courseId,
          whiteBoardUrl: url,
        });
      } else {
        setWhiteBoardUrl(url);
      }
    }
  };

  React.useEffect(() => {
    if (courseId) {
      intializeSocket({ courseId, userId });
      if (socket) {
        socket.on("SET_WHITEBOARD_URL", (data) => setWhiteBoardUrl(data));
      }
    }
  }, [courseId]);

  return {
    initializeWhiteBoard,
    whiteBoardUrl,
    isWhiteboardMaximized,
    toggleWhiteboardMinMax,
    handleLeaveWhiteboard,
  };
};

export default useWhiteBoard;
