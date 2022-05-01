import React from "react";
import Snack from "../components/Snack";
import CourseModal from "../components/Modals/CourseModal";
import GroupModal from "../components/Modals/GroupModal";
import InvitePeople from "../components/Modals/InvitePeople";

import AssignmentModal from "../components/Modals/AssignmentModal";
import VideoPlayerModal from "../components/Modals/VideoPlayerModal";
import FileViewModal from "../components/Modals/FileViewModal";
import Submission from "../components/Modals/Submissions";
import CalendarModal from "../components/Modals/CalendarModal";
import WelcomeModal from "../components/Modals/Welcome";
import GoogleLoginWarning from "../components/Modals/GoogleLoginWarning";
import CreateOrganization from "../components/Modals/CreateOrganizationModal";
import DesclaimerModal from "../components/Modals/DesclamerModal";
import GoogleDesclaimerModal from "../components/Modals/GoogleDesclaimerModal";
import MutationModal from "../components/Modals/MutationModal";

const Util = () => {
  return (
    <div>
      <Snack />
      <DesclaimerModal />
      <MutationModal />
      <GoogleDesclaimerModal />

      <CreateOrganization />
      <CourseModal />
      <GroupModal />
      <AssignmentModal />
      <InvitePeople />
      <VideoPlayerModal />
      <FileViewModal />
      <Submission />
      <CalendarModal />
      <WelcomeModal />
      <GoogleLoginWarning />
    </div>
  );
};

export default Util;
