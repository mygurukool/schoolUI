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

const useChat = ({ assignmentId, userId, userName }) => {
  // const [messages, setMessages] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [currentGroup, setCurrentGroup] = React.useState();
  const [page, setPage] = React.useState(0);

  const [reply, setReply] = React.useState();
  const dispatch = useDispatch();

  const intializeSocket = (data) => {
    socket = socketIOClient(SOCKETURL, {
      query: { data },
    });

    socket.on("connect", async () => {
      try {
        await axios({
          method: "get",
          url: `${BASEURL}chat/usergroups`,
          params: data,
        }).then((res) => {
          const resData = res.data.data;

          setGroups(resData);
        });
      } catch (err) {
        console.log("err");
      }
    });
  };

  //methos
  const connectWithTeacher = (teacher) => {
    const joinData = {
      assignmentId,
      roomId: uuidv4(),
      users: [
        {
          name: teacher.name,
          profileImage: "https://source.unsplash.com/random",
          id: teacher.teacherId,
        },
        {
          name: userName,
          profileImage: "https://source.unsplash.com/random",
          id: userId,
        },
      ],
    };

    socket.emit("JOIN_ROOM", joinData);
  };

  const sendMessage = (message) => {
    // console.log("message", message, currentGroup);

    const messageToBesend = {
      reply: reply ? reply : undefined,
      message: {
        text: message,
        senderName: userName,
        timeStamp: new Date(),
        senderId: userId,
      },
      userId: userId,
      roomId: currentGroup.roomId,
    };

    socket.emit("SEND_MESSAGE", messageToBesend);

    setReply();

    // setMessages([...messages, messageToBesend]);
  };

  const removeReplyMessage = () => {
    setReply();
  };

  const appendMessage = (upComingMessage) => {
    // console.log("append", upComingMessage);
    dispatch(setSingleMessage(upComingMessage));
  };

  const appendMessages = (msgs) => {
    // console.log("append", msgs);

    dispatch(setMessages(msgs));
  };

  const appendGroups = useCallback(async (data) => {
    if (data && data?.length > 0) {
      const filteredGroups = await Promise.all(
        data.filter((g) => {
          const found = g.users.find((u) => {
            return (
              u.id === userId &&
              !groups.find((e) => e._id === g._id || e.id === g.id)
            );
          });

          if (found) {
            return true;
          } else {
            return false;
          }
        })
      );

      setGroups([...groups, ...filteredGroups]);
    } else {
      setGroups([]);
    }
  }, []);

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
          timeStamp: new Date(),
          senderId: userId,
        },
        userId: userId,
        roomId: data.data.roomId,
      };
      socket.emit("SEND_MESSAGE", messageToBesend);
      return;
    }

    if (data.type === "student") {
      const filteredGroups = groups.filter((g) => g.users.length > 2);
      const foundActive = filteredGroups.find((g) => {
        const found = g.users.find((u) => {
          return u.id === data.data.studentId;
        });
        if (found) {
          return true;
        }
        return false;
      });

      console.log("foundActive", foundActive);
      if (foundActive) {
        const messageToBesend = {
          reply: reply ? reply : undefined,
          isForwarded: true,
          message: {
            ...data.message.message,
            senderName: userName,
            timeStamp: new Date(),
            senderId: userId,
          },
          userId: userId,
          roomId: foundActive.roomId,
        };
        socket.emit("SEND_MESSAGE", messageToBesend);
      } else {
        const joinData = {
          assignmentId,
          roomId: uuidv4(),
          users: [
            {
              name: data.data.name,
              profileImage: "https://source.unsplash.com/random",
              id: data.data.studentId,
            },
            {
              name: userName,
              profileImage: "https://source.unsplash.com/random",
              id: userId,
            },
          ],
        };

        socket.emit("JOIN_ROOM", joinData);

        const messageToBesend = {
          reply: reply ? reply : undefined,
          isForwarded: true,
          message: {
            ...data.message.message,
            senderName: userName,
            timeStamp: new Date(),
            senderId: userId,
          },
          userId: userId,
          roomId: joinData.roomId,
        };
        socket.emit("SEND_MESSAGE", messageToBesend);
      }

      // console.log("groups", groups);

      // const messageToBesend = {
      //   reply: reply ? reply : undefined,
      //   message: {
      //     text: data.message,
      //     senderName: userName,
      //     timeStamp: new Date(),
      //     senderId: userId,
      //   },
      //   userId: userId,
      //   roomId: data.roomId,
      // };
      // socket.emit("SEND_MESSAGE", messageToBesend);
    }
  };

  const addUsersToCurrentGroup = (users) => {
    const dataToBesend = {
      groupId: currentGroup?._id || currentGroup?.id,
      users: [
        {
          name: userName,
          profileImage: "https://source.unsplash.com/random",
          id: userId,
        },

        ...users,
      ],
      assignmentId,
      roomId: currentGroup?.roomId || uuidv4(),
    };

    socket.emit("ADD_USERS_TO_GROUP", dataToBesend);
  };

  const incrementPage = () => {
    setPage(page + 1);
  };

  React.useEffect(() => {
    intializeSocket({ assignmentId, userId });

    socket.on("SEND_USER_GROUPS", appendGroups);

    socket.on("GET_MESSAGE", appendMessage);

    socket.on("GET_MESSAGES", appendMessages);
  }, [assignmentId]);

  React.useEffect(() => {
    if (groups.length > 0) {
      const foundActive = groups.findIndex(
        (g) => g.roomId === currentGroup?.roomId
      );
      dispatch(cleanMessages());
      if (foundActive > -1) {
        setCurrentGroup(groups[foundActive]);
      } else {
        setCurrentGroup(groups[0]);
      }
    } else {
      setCurrentGroup();
    }
  }, [groups]);

  React.useEffect(() => {
    if (currentGroup) {
      socket.emit("JOIN_ROOM", currentGroup);
      setPage(0);
      dispatch(setMessages([]));
      setTimeout(() => {
        socket.emit("SEND_MESSAGES", { ...currentGroup, page });
      }, 2000);
    }
  }, [currentGroup]);

  React.useEffect(() => {
    if (page > 0) {
      socket.emit("SEND_MESSAGES", { ...currentGroup, page });
    }
  }, [page]);
  // console.log("current", currentGroup);

  return {
    groups,
    connectWithTeacher,
    sendMessage,
    replyMessage,
    forwardMessage,
    removeReplyMessage,
    addUsersToCurrentGroup,
    incrementPage,
    reply,
  };
};

export default useChat;
