import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";
import { green } from "@mui/material/colors";
import useChat from "../../hooks/useChat";
import { makeStyles } from "@mui/styles";
import MessageList from "./MessageList";
import ChatActions from "./ChatActions";

import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import AddChatUsersModal from "../Modals/AddChatUsersModal";
import ADDICON from "@mui/icons-material/Add";
import ForwardMessageModal from "../Modals/ForwardMessageModal";
const Chat = ({ assignmentId }) => {
  const classes = useStyles();

  const {
    open: addChatUsersPromt,
    modalData: chatUsersAddList,
    openModal: openaddChatUsersPromt,
    closeModal: closeaddChatUsersPromt,
  } = useModal();

  const {
    open: forwardMessagePromt,
    modalData: forwardData,
    openModal: openforwardMessagePromt,
    closeModal: closeforwardMessagePromt,
  } = useModal();

  const [value, setValue] = React.useState(0);

  const { id, name, isTeacher, loginType } = useSelector((state) => state.user);
  const { teachers, messages, students } = useSelector((state) => state.common);

  // console.log("teachers", "students", students, teachers);

  const courseTeachers =
    loginType === "google"
      ? teachers.filter((t) => t.teacherId !== id)
      : teachers;
  const {
    groups,
    connectionStatus,
    sendMessage,
    removeReplyMessage,
    replyMessage,
    forwardMessage,
    reply,
    connectWithTeacher,
    addUsersToCurrentGroup,
    incrementPage,
  } = useChat({
    assignmentId: assignmentId,
    userId: id,
    userName: name,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleConnectTeacher = (currentTeacher) => {
    connectWithTeacher(currentTeacher);
  };
  const onOpenAddUsersToChat = (id) => {
    let data = [];
    // if (isTeacher) {
    courseTeachers
      .filter((t) => t.teacherId !== id || t.id !== id || t._id !== id)
      .forEach((t) => {
        data.push({
          role: "Teachers",
          name: t.name,
          profileImage: undefined,
          id: t.teacherId || t.id || t._id,
        });
      });
    // }
    students
      .filter((t) => t.studentId !== id || t.id !== id || t._id !== id)
      .forEach((t) => {
        data.push({
          role: "Students",
          name: t.name,
          profileImage: undefined,
          id: t.studentId || t.id || t._id,
        });
      });
    openaddChatUsersPromt({
      assignmentId: id,
      options: data,
    });
    // console.log("teacher", teachers, students);
  };

  const onForwardMessage = (msg) => {
    openforwardMessagePromt({
      assignmentId: assignmentId,
      messageToForward: msg,
      groups,
      students,
      teachers,
    });
  };

  const onSubmitAddUsersToChat = (users) => {
    addUsersToCurrentGroup(users);
    closeaddChatUsersPromt();
  };

  const onSubmitForwardMsg = (data) => {
    forwardMessage({
      ...data,
      message: forwardData.messageToForward,
    });

    closeforwardMessagePromt();
  };
  return (
    <>
      <AddChatUsersModal
        options={chatUsersAddList?.options || []}
        open={addChatUsersPromt}
        onClose={() => closeaddChatUsersPromt()}
        onSubmit={(data) => onSubmitAddUsersToChat(data)}
      />

      <ForwardMessageModal
        options={forwardData}
        open={forwardMessagePromt}
        onClose={() => closeforwardMessagePromt()}
        onSubmit={(data) => onSubmitForwardMsg(data)}
      />
      <Card variant="outlined">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          {groups.length === 0 &&
            (courseTeachers.length > 0 || students?.length > 0) && (
              <Card>
                <CardContent>
                  <Button onClick={onOpenAddUsersToChat}>
                    <ADDICON />
                    Add users
                  </Button>
                </CardContent>
              </Card>
            )}

          {groups.map((g, i) => {
            const recepiants = g.users.filter((u) => u.id !== id);
            const sliceAt = 5;

            const label = recepiants.length > 2 ? "Group" : recepiants[0].name;
            return (
              <Tab
                icon={
                  <RenderAvatar recepiants={recepiants} sliceAt={sliceAt} />
                }
                iconPosition="start"
                label={label}
                classes={{
                  root: classes.TabLabel,
                }}
                {...a11yProps(i)}
              />
            );
          })}
        </Tabs>
        <Divider />

        {/* {courseTeachers.length === 1 && groups.length === 0 && (
          <Button
            onClick={() => {
              handleConnectTeacher(courseTeachers[0]);
            }}
          >
            connect with {courseTeachers[0].name}
          </Button>
        )} */}

        {groups.map((g, i) => {
          return (
            <TabPanel value={value} index={i} key={i}>
              <MessageList
                messages={messages}
                userId={id}
                replyMessage={replyMessage}
                forwardMessage={onForwardMessage}
                incrementPage={incrementPage}
              />
            </TabPanel>
          );
        })}
        <ChatActions
          onSendMessage={sendMessage}
          reply={reply}
          removeReply={removeReplyMessage}
          isTeacher={isTeacher}
          onOpenAddUsersToChat={onOpenAddUsersToChat}
        />
      </Card>
    </>
  );
};
export default Chat;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
      <Divider />
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// const RenderTablabel = ({ recepiants, index }) => {
//   return (
//     <Tab
//       icon={<RenderAvatar recepiants={recepiants} sliceAt={sliceAt} />}
//       iconPosition="start"
//       label={label}
//       {...a11yProps(index)}
//     />
//   );
// };
export const RenderAvatar = ({ recepiants, sliceAt }) => {
  const defaultBgColor = { bgcolor: green[500], height: 20, width: 20 };

  return (
    <AvatarGroup total={recepiants.length} max={sliceAt}>
      {recepiants.map((r, i) => {
        return <Avatar sx={defaultBgColor} alt={r.name} src={r.profileImage} />;
      })}
    </AvatarGroup>
  );
};

const flattenLabel = (array, slice) => {
  let string = "";

  array.slice(0, slice).forEach((d) => {
    string = string + `${d.name} ,`;
  });
  return `${string} + more`;
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    height: "auto",
    maxHeight: "auto",
  },
  Tab: {
    backgroundColor: "red",
    padding: 0,
  },
  CardContent: {
    height: "auto",
  },
  TabLabel: {
    height: "20px",
  },
}));
// import React from "react";
// import { makeStyles } from "@mui/styles";
// import {
//   Avatar,
//   Card,
//   CardHeader,
//   AppBar,
//   Tabs,
//   Tab,
//   Divider,
//   CardContent,
//   CardActionArea,
// } from "@mui/material";
// import MessageList, { MessageLeft, MessageRight } from "./MessageList";
// import ChatActions from "./ChatActions";
// import useChat from "../../hooks/useChat";
// import { Box } from "@mui/system";

// const Chat = ({ assignmentId }) => {
//   const classes = useStyles();
//   const { currentChat } = useChat();
//   const [activeTab, setActiveTab] = React.useState(0);

//   const handleTabActivate = (id) => {
//     setActiveTab(id);
//   };

//   return (
//     <>
//       <Card variant="outlined">
//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tabs
//             value={activeTab}
//             onChange={handleTabActivate}
//             aria-label="basic tabs example"
//           >
//             <Tab label="Item One" {...a11yProps(0)} />
//             <Tab label="Item Two" {...a11yProps(1)} />
//             <Tab label="Item Three" {...a11yProps(2)} />
//           </Tabs>
//         </Box>
//         <TabPanel value={activeTab} index={0}>
//           Item One
//         </TabPanel>
//         <TabPanel value={activeTab} index={1}>
//           Item Two
//         </TabPanel>
//         <TabPanel value={activeTab} index={2}>
//           Item Three
//         </TabPanel>
//       </Card>
//       {/* <Card variant="outlined" className={classes.root}>
//         <CardContent className={classes.CardContent}>
//           <TabPanel value={activeTab} index={activeTab}>
//             <MessageList />
//           </TabPanel>
//         </CardContent>

//         <CardContent>
//           <ChatActions />
//         </CardContent>
//       </Card> */}
//     </>
//   );
// };

// export default Chat;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "white",
//     height: "auto",
//     maxHeight: "auto",
//   },
//   Tab: {
//     backgroundColor: "red",
//     padding: 0,
//   },
//   CardContent: {
//     height: "auto",
//   },
// }));

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && <>{children}</>}
//     </div>
//   );
// }
// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }
