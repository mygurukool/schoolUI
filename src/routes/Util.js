import React from "react";
import Snack from "../components/Snack";
import CourseModal from "../components/Modals/CourseModal";
import GroupModal from "../components/Modals/GroupModal";
import InvitePeople from "../components/Modals/InvitePeople";

import AssignmentModal from "../components/Modals/AssignmentModal";
import VideoPlayerModal from "../components/Modals/VideoPlayerModal";

const Util = () => {
  return (
    <div>
      <Snack />
      <CourseModal />
      <GroupModal />
      <AssignmentModal />
      <InvitePeople />
      <VideoPlayerModal />
    </div>
  );
};

export default Util;
