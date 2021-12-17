import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  Typography,
} from "@mui/material";

//icons
import CheckIcon from "@mui/icons-material/CheckTwoTone";
import RightIcon from "@mui/icons-material/ExpandMore";
import VideoIcon from "@mui/icons-material/PlayCircleFilledTwoTone";
import ChatIcon from "@mui/icons-material/TextsmsTwoTone";
import CourseMaterialList from "./CourseMaterialList";
import { CalendarToday } from "@mui/icons-material";
import FaceIcon from "@mui/icons-material/Face";
import { Box } from "@mui/system";
import clsx from "clsx";
import Videocard from "./VideoCard";
import VideoModal from "./VideoModal";
import FileCard from "./FileCard";
import DueDateTime from "./DueDateTime";
import moment from "moment";
import { DUEDATETIMEFORMAT } from "../../constants";
import createNewChat from "../../helpers/createNewChat";
import Chat from "../../components/Chat";

const AssignmentList = ({ assignments }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState();
  const [video, setPlayingVideo] = React.useState();

  const handleExpand = (i) => {
    if (expanded === i) {
      setExpanded();
    } else {
      setExpanded(i);
    }
  };

  return (
    <>
      <VideoModal
        open={Boolean(video)}
        onClose={() => setPlayingVideo()}
        video={video}
      />
      <div className={classes.root}>
        {assignments.map((a, i) => {
          // console.log("a", a);

          return (
            <AssignmentListItem
              key={i}
              {...a}
              expanded={expanded === i}
              onSelectAssignment={() => handleExpand(i)}
              setPlayingVideo={setPlayingVideo}
            />
          );
        })}
      </div>
    </>
  );
};

export default AssignmentList;

const AssignmentListItem = ({
  expanded,
  setExpanded,
  onSelectAssignment,

  setPlayingVideo,
  ...props
}) => {
  const { title, description, materials = [], dueDate, dueTime, id } = props;
  const [enableChat, setEnableChat] = React.useState(false);

  const classes = useStyles();
  const dueDateTime = dueDate
    ? `${dueDate?.day}/${dueDate?.month}/${dueDate?.year} ${dueTime.hours}:${dueTime.minutes}`
    : undefined;

  const currentDiffrence = dueDate
    ? moment(dueDateTime, DUEDATETIMEFORMAT).diff(moment(), "days")
    : undefined;
  const hasAudioVideo = materials.filter((d) => d.youtubeVideo);
  const hasDocuments = materials.filter((d) => d.driveFile);

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
          <Grid item lg={dueDateTime ? 9 : 11}>
            <Typography>{title}</Typography>
          </Grid>
          {dueDateTime && (
            <Grid item lg={3}>
              <DueDateTime
                dueDateTime={dueDateTime}
                currentDiffrence={currentDiffrence}
              />
            </Grid>
          )}
          {!expanded && (
            <Grid item lg={12}>
              <Typography
                color="textSecondary"
                className={clsx(classes.description, classes.ellipses)}
                variant="body2"
              >
                {description}
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
            {description}
          </ItemSection>

          {hasAudioVideo && (
            <ItemSection
              title="Exercise Audio/ Video Explanation"
              endAction={ChatBtn}
            >
              <Grid container>
                <Grid item container lg={6} md={6} sm={12} xs={12}>
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
                {hasDocuments.map((a, i) => {
                  return (
                    <FileCard
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
