
import ConferenceIcon from '@mui/icons-material/VideocamTwoTone';
import ClassIcon from '@mui/icons-material/ClassTwoTone';
import CourseIcon from '@mui/icons-material/DnsTwoTone';
import CourseworkIcon from '@mui/icons-material/ListAltTwoTone';
import InvitePeopleIcon from '@mui/icons-material/GroupAddTwoTone';

export const studentRoutes = [

    {
        title: "Conference",
        icon: <ConferenceIcon />,
        path: "/",
    },

];

export const teacherRoutes = [

    {
        title: "Create Class",
        icon: <ClassIcon />,
        path: "/",
    },
    {
        title: "Create Course",
        icon: <CourseIcon />,
        path: "/",
    },
    {
        title: "Create Coursework",
        icon: <CourseworkIcon />,
        children: [
            {
                title: "Assignment",
            },
            {
                title: "Question",
            },
            {
                title: "Quiz Assignment",
            }
        ]
    },
    {
        title: "Invite People",
        icon: <InvitePeopleIcon />,
        path: "/",
    },
];
