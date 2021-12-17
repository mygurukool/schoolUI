const createNewChat = ({ id }) => {
  let chatData = {
    open: true,
    ownerId: undefined,
    recepiants: [],
    ownerName: undefined,
    assignmentId: id,
    chatId: id,

    ownerAvatar: "https://source.unsplash.com/random",

    messages: [],
  };
  return chatData;
};

export default createNewChat;
