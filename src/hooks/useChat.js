import React, { useRef } from "react";
import socketIOClient from "socket.io-client";
import { SOCKETURL } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

const useChat = (data) => {
  const { assignmentId, userId, userName } = data;
  const socketRef = useRef();
  const [messages, setMessages] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [currentGroup, setCurrentGroup] = React.useState();
  const [page, setPage] = React.useState(0);
  const [reply, setReply] = React.useState();

  React.useEffect(() => {
    if (assignmentId) {
      setPage(0);
      socketRef.current = socketIOClient(`${SOCKETURL}`, {
        query: { assignmentId, userId, userName, path: "chat" },
        reconnection: false,
      });
    }

    return () => socketRef.current.disconnect();
  }, [assignmentId]);

  React.useEffect(() => {
    if (groups && !currentGroup) {
      setPage(0);

      setCurrentGroup(groups[0]);
      setMessages([]);
    }
  }, [groups]);

  React.useEffect(() => {
    if (currentGroup?.id || currentGroup?._id) {
      setMessages([]);
      setPage(0);
      socketRef.current.emit("GETMESSAGES", {
        groupId: currentGroup?.id,
        page,
      });
    }
  }, [currentGroup]);

  React.useEffect(() => {
    if (page) {
      socketRef.current.emit("GETMESSAGES", {
        groupId: currentGroup?.id,
        page,
      });
    }
  }, [page]);

  React.useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    const messagesListener = (messages) => {
      setMessages((prevMessages) => [...messages, ...prevMessages]);
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socketRef.current.on("message", messageListener);
    socketRef.current.on("SETMESSAGES", messagesListener);

    socketRef.current.on("deleteMessage", deleteMessageListener);
    socketRef.current.on("setGroups", appendGroups);
    socketRef.current.emit("getGroups");

    return () => {
      socketRef.current.off("message", messageListener);
      socketRef.current.off("deleteMessage", deleteMessageListener);
    };
  }, []);

  const changeGroup = (group) => {
    setCurrentGroup(group);
  };

  const addUsersToCurrentGroup = (users) => {
    const dataToBesend = {
      ...currentGroup,
      users: [
        {
          name: userName,
          profileImage: "https://source.unsplash.com/random",
          id: userId,
        },

        ...users,
      ],
      assignmentId,
      roomId: uuidv4(),
    };

    socketRef.current.emit("ADD_USERS_TO_GROUP", dataToBesend);
  };

  const appendGroups = (data) => {
    if (data)
      if (Array.isArray(data)) {
        setGroups((prevGroups) => [...prevGroups, ...data]);
      } else {
        setGroups((prevGroups) => [...prevGroups, data]);
      }
  };

  const sendMessage = (message) => {
    // console.log("message", message, currentGroup);

    const messageToBesend = {
      reply: reply ? reply : undefined,
      message: {
        text: message,
        senderName: userName,

        senderId: userId,
      },
      timeStamp: new Date(),
      userId: userId,
      roomId: currentGroup.roomId,
      groupId: currentGroup.id || currentGroup._id,
      id: uuidv4(),
    };

    socketRef.current.emit("MESSAGE", messageToBesend);

    setReply();
  };

  const replyMessage = (message) => {
    setReply(message);
  };
  const forwardMessage = (data) => {
    console.log("forwardMessage", data);

    if (data.type === "group") {
      const messageToBesend = {
        reply: reply ? reply : undefined,
        isForwarded: true,
        message: {
          ...data.message.message,
          senderName: userName,
          senderId: userId,
        },
        timeStamp: new Date(),

        userId: userId,
        roomId: data.data.roomId,
        groupId: currentGroup.id || currentGroup._id,
      };
      socketRef.current.emit("FORWARD_MESSAGE", { message: messageToBesend });
      return;
    } else {
      const groupToCreate = {
        users: [
          {
            name: userName,
            profileImage: "https://source.unsplash.com/random",
            id: userId,
          },
          {
            name: data.data.name,
            profileImage: "https://source.unsplash.com/random",
            id: data.data.id || data.data._id,
          },
        ],
        assignmentId,
        roomId: uuidv4(),
      };
      const messageToBesend = {
        reply: reply ? reply : undefined,
        isForwarded: true,
        message: {
          ...data.message.message,
          senderName: userName,
          senderId: userId,
        },
        timeStamp: new Date(),

        userId: userId,
        roomId: data.data.roomId,
        groupId: currentGroup.id || currentGroup._id,
      };
      socketRef.current.emit("FORWARD_MESSAGE", {
        group: groupToCreate,
        message: messageToBesend,
      });
      return;
    }
  };

  const removeReplyMessage = () => {};
  const incrementPage = () => {
    setPage(page + 1);
  };

  return {
    groups,
    sendMessage,
    replyMessage,
    forwardMessage,
    removeReplyMessage,
    addUsersToCurrentGroup,
    incrementPage,
    reply,
    messages,
    changeGroup,
  };
};

export default useChat;
