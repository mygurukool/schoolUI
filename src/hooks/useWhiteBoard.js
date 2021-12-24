import React, { useCallback } from "react";
import { BASEURL, SOCKETURL } from "../constants";
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
let socket;

const useWhiteBoard = ({ courseId, userId, userName }) => {
  // const [messages, setMessages] = React.useState([]);
  const [whiteBoardUrl, setWhiteBoardUrl] = React.useState();

  const intializeSocket = (data) => {
    socket = socketIOClient(SOCKETURL, {
      query: { data },
    });

    socket.on("connect", async () => {
      socket.emit("JOIN_WHITEBOARD_ROOM", courseId);
    });
  };

  //methos

  const initializeWhiteBoard = (url) => {
    socket.emit("CREATE_WHITEBOARD", { courseId, whiteBoardUrl: url });
  };

  React.useEffect(() => {
    if (courseId) {
      intializeSocket({ courseId, userId });
      socket.on("SET_WHITEBOARD_URL", (data) => setWhiteBoardUrl(data));
    }
  }, [courseId]);

  // console.log("current", currentGroup);

  return {
    initializeWhiteBoard,
    whiteBoardUrl,
  };
};

export default useWhiteBoard;
