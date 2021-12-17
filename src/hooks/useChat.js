import React, { useCallback } from "react";
import { BASEURL, SOCKETURL } from "../constants";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
let socket;

const useChat = ({ assignmentId, userId, userName }) => {
  const [messages, setMessages] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [currentGroup, setCurrentGroup] = React.useState();

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
          if (resData.length > 0) {
            socket.emit("JOIN_ROOM", resData[0]);
          }
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
      message: { text: message },
      userId: userId,
      roomId: currentGroup.roomId,
    };

    socket.emit("SEND_MESSAGE", messageToBesend);

    // setMessages([...messages, messageToBesend]);
  };

  const appendMessage = (upComingMessage) => {
    // console.log("appendMessage", upComingMessage.message.text);
    let newMessages = messages;
    newMessages.push(upComingMessage);
    setMessages(newMessages);

    // console.log("message get", messages, upComingMessage);
  };
  // console.log("messages", messages);

  const appendGroups = useCallback(async (data) => {
    const filteredGroups = await Promise.all(
      data.filter((g) => {
        const found = g.users.find((u) => {
          return u.id === userId;
        });
        if (found) {
          return true;
        } else {
          return false;
        }
      })
    );
    setGroups([...filteredGroups]);
  }, []);

  React.useEffect(() => {
    intializeSocket({ assignmentId, userId });

    socket.on("SEND_USER_GROUPS", appendGroups);

    socket.on("GET_MESSAGE", appendMessage);
  }, [assignmentId]);

  React.useEffect(() => {
    if (groups.length > 0) {
      const foundActive = groups.findIndex(
        (g) => g.roomId === currentGroup?.roomId
      );

      if (foundActive > -1) {
        setCurrentGroup(groups[foundActive]);
      } else {
        setCurrentGroup(groups[0]);
      }
    }
  }, [groups]);

  console.log("current", currentGroup);

  return {
    messages,
    groups,
    connectWithTeacher,
    sendMessage,
  };
};

export default useChat;

const defaultSingleData = {
  ownerId: 123,
  recepiants: [
    {
      name: "Jasmeet",
      profileImage: "https://source.unsplash.com/random",
      id: 25,
    },
  ],
};
