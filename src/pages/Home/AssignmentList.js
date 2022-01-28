import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

//icons
import CheckIcon from "@mui/icons-material/CheckTwoTone";
import RightIcon from "@mui/icons-material/ExpandMore";
import ChatIcon from "@mui/icons-material/TextsmsTwoTone";
import CourseMaterialList from "./CourseMaterialList";
import { CalendarToday, FactCheck } from "@mui/icons-material";
import FaceIcon from "@mui/icons-material/Face";
import { Box } from "@mui/system";
import clsx from "clsx";
import Videocard from "./VideoCard";
import VideoModal from "./VideoModal";
import FileCard from "./FileCard";
import DueDateTime from "./DueDateTime";
import moment from "moment";
import { DUEDATETIMEFORMAT, SCOPES } from "../../constants";
import Chat from "../../components/Chat";
import { useSelector, useDispatch } from "react-redux";
import PermissionsGate from "../../components/PermissionGate";
import Add from "@mui/icons-material/Add";
import { openModal } from "../../redux/action/utilActions";
import Edit from "@mui/icons-material/Edit";

import parse from "html-react-parser";
import AudioVideoCard from "./AudioVideoCard";
import { useHistory } from "react-router";
const AssignmentList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [expanded, setExpanded] = React.useState();
  const [video, setPlayingVideo] = React.useState();
  const { assignments, currentCourse, courses } = useSelector(
    (state) => state.common
  );
  const { isTeacher, loginType } = useSelector((state) => state.user);

  const handleExpand = (i) => {
    if (expanded === i) {
      setExpanded();
    } else {
      setExpanded(i);
    }
  };

  const onEdit = (data) => {
    dispatch(openModal("assignment", data));
  };

  const onCheck = (data) => {
    history.push(`/submission/${data.id || data._id}`);
  };

  return (
    courses?.length > 0 && (
      <>
        {currentCourse ? (
          <>
            <PermissionsGate scopes={[SCOPES.CAN_CREATE_ASSIGNMENT]}>
              <ActionBar />
            </PermissionsGate>

            <VideoModal
              open={Boolean(video)}
              onClose={() => setPlayingVideo()}
              video={video}
            />
            <div className={classes.root}>
              {assignments.map((a, i) => {
                return (
                  <AssignmentListItem
                    key={i}
                    {...a}
                    expanded={expanded === i}
                    onSelectAssignment={() => handleExpand(i)}
                    setPlayingVideo={setPlayingVideo}
                    onEdit={() => onEdit(a)}
                    onCheck={() => onCheck(a)}
                    isTeacher={isTeacher}
                    loginType={loginType}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <Alert severity="info">Please Select a course</Alert>
        )}
      </>
    )
  );
};

export default AssignmentList;

const ActionBar = () => {
  const dispatch = useDispatch();

  const onAddAssignment = () => {
    dispatch(openModal("assignment"));
  };
  return (
    <Stack direction="row" mb="2">
      <div />

      <Button variant="contained" onClick={onAddAssignment}>
        <Add />
        Add new assignment
      </Button>
    </Stack>
  );
};

const AssignmentListItem = ({
  expanded,
  setExpanded,
  onSelectAssignment,

  setPlayingVideo,
  onOpenAddUsersToChat,
  onEdit,
  onCheck,
  ...props
}) => {
  const {
    assignmentTitle,
    instructions,
    materials = [],
    audioVideo,
    uploadExercises,
    dueDate,
    dueTime,
    id,
    _id,
    isTeacher,
    loginType,
  } = props;
  const [enableChat, setEnableChat] = React.useState(false);
  const classes = useStyles();
  // const dueDateTime = dueDate
  //   ? `${dueDate?.day}/${dueDate?.month}/${dueDate?.year} ${dueTime.hours}:${dueTime.minutes}`
  //   : undefined;
  const dueDateTime = dueDate;
  // ? `${dueDate?.day}/${dueDate?.month}/${dueDate?.year} ${dueTime.hours}:${dueTime.minutes}`
  // : undefined;

  const currentDiffrence = dueDate
    ? moment(dueDateTime, DUEDATETIMEFORMAT).diff(moment(), "days")
    : undefined;

  const hasAudioVideo = materials.filter((d) => d.youtubeVideo);
  const hasDocuments = materials.filter((d) => d.driveFile);
  const isMyGuruKool = loginType === "mygurukool";
  const ChatBtn = () => {
    return (
      <Button
        variant="text"
        onClick={() => setEnableChat(!enableChat)}
        color="inherit"
        startIcon={<ChatIcon />}
        size="small"
      >
        Feel free to ask
      </Button>
    );
  };

  const TurnInBtn = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<CheckIcon />}
        size="small"
      >
        Turn in
      </Button>
    );
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={onSelectAssignment}
      className={classes.Accordion}
      elevation={0}
    >
      <AccordionSummary expandIcon={<RightIcon />}>
        <Grid container>
          <Grid item lg={dueDateTime ? 6 : 10}>
            <Typography>{assignmentTitle}</Typography>
          </Grid>
          {dueDateTime && (
            <Grid item lg={4}>
              <DueDateTime
                dueDateTime={dueDateTime}
                currentDiffrence={currentDiffrence}
              />
            </Grid>
          )}
          <PermissionsGate scopes={[SCOPES.CAN_EDIT_ASSIGNMENT]}>
            <Grid item lg={1}>
              <Tooltip title={"Edit Assignment"}>
                <IconButton
                  size="small"
                  color="secondary"
                  disabled={!isMyGuruKool}
                  onClick={() => onEdit()}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </PermissionsGate>
          {isTeacher && loginType !== "mygurukool" && (
            <Grid item lg={1}>
              <Tooltip
                title={
                  isMyGuruKool
                    ? "Edit Assignment"
                    : "This functionality is not available Right now"
                }
              >
                <IconButton
                  size="small"
                  color="secondary"
                  disabled={!isMyGuruKool}
                  onClick={() => onEdit()}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          )}

          <PermissionsGate scopes={[SCOPES.CAN_EDIT_ASSIGNMENT]}>
            <Grid item lg={1}>
              <Tooltip title="Check submissions">
                <IconButton
                  onClick={() => onCheck()}
                  size="small"
                  color="secondary"
                >
                  <FactCheck fontSize="small" />
                </IconButton>
              </Tooltip>
            </Grid>
          </PermissionsGate>

          {!expanded && (
            <Grid item lg={12}>
              <Typography
                color="textSecondary"
                className={clsx(classes.description, classes.ellipses)}
                variant="body2"
              >
                {parse(`<div> ${instructions}</div>`)}
              </Typography>
            </Grid>
          )}
        </Grid>
      </AccordionSummary>
      <AccordionDetails className={classes.AccordionDetails}>
        <Stack
          spacing={1}
          direction="column"
          pb={2}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <ItemSection title="Exercise Instructions" endAction={TurnInBtn}>
            {parse(`<div> ${instructions}</div>`)}
          </ItemSection>

          {hasAudioVideo && (
            <ItemSection
              title="Exercise Audio/ Video Explanation"
              endAction={ChatBtn}
            >
              <Grid container>
                <Grid item container lg={6} md={6} sm={12} xs={12}>
                  {audioVideo?.map((a, ai) => {
                    return <AudioVideoCard key={ai} {...a} />;
                  })}
                  {hasAudioVideo.map((a, i) => {
                    return (
                      <Videocard
                        key={i}
                        {...a.youtubeVideo}
                        onClick={() => setPlayingVideo(a.youtubeVideo)}
                      />
                    );
                  })}
                </Grid>
                {enableChat && (
                  <Grid item lg={6}>
                    <Chat assignmentId={id} />
                  </Grid>
                )}
              </Grid>
            </ItemSection>
          )}

          {hasDocuments && (
            <ItemSection title=" Upload Exercises">
              <Grid container>
                {uploadExercises?.map((a, ai) => {
                  return <FileCard assignmentId={id || _id} key={ai} {...a} />;
                })}
                {hasDocuments.map((a, i) => {
                  return (
                    <FileCard
                      assignmentId={id || _id}
                      key={i}
                      {...a.driveFile?.driveFile}
                      onClick={() => setPlayingVideo(a.youtubeVideo)}
                    />
                  );
                })}
              </Grid>
            </ItemSection>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const ItemSection = ({ title, children, endAction: EndAction }) => {
  const classes = useStyles();
  return (
    <>
      <Stack spacing={1} direction="column" pb={2} pt={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography className={classes.title}>{title}</Typography>
          {EndAction && <EndAction />}
        </Stack>

        <div> {children}</div>
      </Stack>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  ellipses: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  Accordion: {
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    marginBottom: 0,
  },

  AccordionDetails: {
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    backgroundColor: theme.palette.gray[400],
  },
  title: {
    fontWeight: theme.palette.fontWeights.bold,
  },
}));
// const AssignmentListItem = ({
//   expanded,
//   setExpanded,
//   onSelectAssignment,
//   chat,
//   setChat,
//   ...props
// }) => {
//   const { title, description, materials = [] } = props;
//   const [enableChat, setEnableChat] = React.useState(false);

//   const classes = useStyles();
//   const sm = 6;
//   return (
//     <Accordion
//       expanded={expanded}
//       onChange={onSelectAssignment}
//       className={classes.root}
//       elevation={0}
//     >
//       <AccordionSummary expandIcon={<RightIcon />}>{title}</AccordionSummary>
//       <AccordionDetails>
//         <Grid container spacing={2}>
//           <Grid item lg={12}>
//             <div className={classes.between}>
//               <Typography className={classes.subHeading}>
//                 Exercise Instructions
//               </Typography>
//               <div>
//                 <Button
//                   variant="text"
//                   style={{ marginRight: 10 }}
//                   onClick={() => setChat(!chat)}
//                   color="secondary"
//                   startIcon={<ChatIcon />}
//                 >
//                   Feel free to ask
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<CheckIcon />}
//                 >
//                   Turn in
//                 </Button>
//               </div>
//             </div>
//             <Typography variant="subtitle1">{description}</Typography>
//             <Divider className={classes.divider} />
//           </Grid>
//           {materials && materials.length > 0 && (
//             <Grid
//               item
//               lg={sm ? (chat ? 12 : 6) : chat ? 6 : 12}
//               style={chat ? { borderRight: "1px solid rgba(0,0,0,0.12)" } : {}}
//             >
//               <Typography className={classes.subHeading}>
//                 Exercise Audio/ Video Explanation
//               </Typography>
//               <Grid container style={{ width: "100%" }}>
//                 <CourseMaterialList materials={materials} />
//               </Grid>
//               <Divider className={classes.divider} />
//               <Typography className={classes.subHeading}>
//                 Upload Exercises
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item lg={chat ? 12 : 6}>
//                   {/* <UploadExpercise /> */}
//                 </Grid>
//               </Grid>
//             </Grid>
//           )}
//           {chat && (
//             <Grid item lg={6}>
//               <Typography className={classes.subHeading}>
//                 Chat with teacher
//               </Typography>
//               {/* <Chat /> */}
//             </Grid>
//           )}
//         </Grid>

//         <div></div>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// const AssignmentListItem = ({
//   expanded,
//   setExpanded,
//   onSelectAssignment,
//   chat,
//   setChat,
//   ...props
// }) => {
//   const { title, description, materials = [] } = props;

//   const classes = useStyles();
//   const sm = 6;
//   return (
//     <Accordion
//       expanded={expanded}
//       onChange={onSelectAssignment}
//       className={classes.root}
//       elevation={0}
//     >
//       <AccordionSummary
//         expandIcon={<RightIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             flexDirection: "column",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div className={classes.date}>
//               <Typography className={classes.dateDay}>16</Typography>
//               <Typography variant="caption" className={classes.dateMonth}>
//                 Sep
//               </Typography>
//             </div>
//             <Typography className={classes.heading}>{title}</Typography>
//           </div>

//           {expanded && (
//             <Typography className={classes.ellipses}>
//               Please write a sentence for each of the article: der, die, das
//               meine-hausaufgabe.pdf
//             </Typography>
//           )}
//         </div>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Grid container spacing={2}>
//           <Grid item lg={12}>
//             <div className={classes.between}>
//               <Typography className={classes.subHeading}>
//                 Exercise Instructions
//               </Typography>
//               <div>
//                 <Button
//                   variant="text"
//                   style={{ marginRight: 10 }}
//                   onClick={() => setChat(!chat)}
//                   color="secondary"
//                   startIcon={<ChatIcon />}
//                 >
//                   Feel free to ask
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<CheckIcon />}
//                 >
//                   Turn in
//                 </Button>
//               </div>
//             </div>
//             <Typography variant="subtitle1">{description}</Typography>
//             <Divider className={classes.divider} />
//           </Grid>
//           {materials && materials.length > 0 && (
//             <Grid
//               item
//               lg={sm ? (chat ? 12 : 6) : chat ? 6 : 12}
//               style={chat ? { borderRight: "1px solid rgba(0,0,0,0.12)" } : {}}
//             >
//               <Typography className={classes.subHeading}>
//                 Exercise Audio/ Video Explanation
//               </Typography>
//               <Grid container style={{ width: "100%" }}>
//                 <CourseMaterialList materials={materials} />
//               </Grid>
//               <Divider className={classes.divider} />
//               <Typography className={classes.subHeading}>
//                 Upload Exercises
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item lg={chat ? 12 : 6}>
//                   {/* <UploadExpercise /> */}
//                 </Grid>
//               </Grid>
//             </Grid>
//           )}
//           {chat && (
//             <Grid item lg={6}>
//               <Typography className={classes.subHeading}>
//                 Chat with teacher
//               </Typography>
//               {/* <Chat /> */}
//             </Grid>
//           )}
//         </Grid>

//         <div></div>
//       </AccordionDetails>
//     </Accordion>
//   );
// };
