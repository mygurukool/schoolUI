import React, { useCallback } from "react";
import { BASEURL, SCOPES, SOCKETURL } from "../constants";
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
let socket;

const useWhiteBoard = () => {
  const currentCourse = useSelector((state) => state.common.currentCourse);
  const {
    id: userId,
    isTeacher,
    name: userName,
    loginType,
  } = useSelector((state) => state.user);

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
      if (isTeacher) {
        socket.emit("CREATE_WHITEBOARD", {
          courseId,
          whiteBoardUrl: `https://wbo.ophir.dev/boards/VidyamandirClass8A#28112021`,
        });
      } else {
        setWhiteBoardUrl(
          `https://wbo.ophir.dev/boards/VidyamandirClass8A${userName}#28112021`
        );
      }
    }
  };

  React.useEffect(() => {
    if (courseId) {
      intializeSocket({ courseId, userId });
      socket.on("SET_WHITEBOARD_URL", (data) => setWhiteBoardUrl(data));
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
