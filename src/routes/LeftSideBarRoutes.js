import ConferenceIcon from "@mui/icons-material/VideocamTwoTone";
import ClassIcon from "@mui/icons-material/ClassTwoTone";
import CourseIcon from "@mui/icons-material/DnsTwoTone";
import CourseworkIcon from "@mui/icons-material/ListAltTwoTone";
import School from "@mui/icons-material/School";

import InvitePeopleIcon from "@mui/icons-material/GroupAddTwoTone";

export const studentRoutes = [
  {
    title: "Conference",
    icon: <ConferenceIcon />,
    path: "/",
  },
];

export const teacherRoutes = [
  {
    title: "Invite Students",
    icon: <School />,
    modalName: "invitepeoples",
    path: "/",
  },
  {
    title: "Create Class",
    icon: <ClassIcon />,
    modalName: "class",
    path: "/",
  },
  {
    title: "Create Course",
    icon: <CourseIcon />,
    modalName: "course",

    path: "/",
  },
  {
    title: "Create Coursework",
    icon: <CourseworkIcon />,
    children: [
      {
        title: "Assignment",
        modalName: "assignment",
      },
      {
        title: "Question",
        modalName: "question",
      },
      {
        title: "Quiz Assignment",
        modalName: "quizassignments",
      },
    ],
  },
  {
    title: "Invite People",
    icon: <InvitePeopleIcon />,
    modalName: "invitepeoples",

    path: "/",
  },
];
