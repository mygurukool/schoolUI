import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";

import {
  createAssignmet,
  editAssignmet,
  getAssignments,
} from "../../redux/action/assignmentActions";
import FormCreator from "../Form/FormCreator";
import moment from "moment";
import { DATETIMEFORMAT } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const AssignmentModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { organizationId, id } = useSelector((state) => state.user);

  const { groups, students, currentCourse, currentGroup } = useSelector(
    (state) => state.common
  );

  const courseId = currentCourse?.id || currentCourse?._id;
  const groupId = currentGroup?.id || currentGroup?._id;

  const mode = modalData ? "edit" : "add";

  const open = modalOpen === "assignment";
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (data) => {
    if (mode === "add")
      dispatch(
        createAssignmet(
          {
            ...data,
            organizationId,

            courseId,
            groupId,
            userId: id,
          },
          () => {
            dispatch(getAssignments(courseId));
            handleClose();
          }
        )
      );
    else {
      dispatch(
        editAssignmet(
          {
            ...data,
            organizationId,
            courseId,
            groupId,

            userId: id,
          },
          () => {
            dispatch(getAssignments(courseId));
            handleClose();
          }
        )
      );
    }
  };

  return (
    <ModalContainer
      open={open}
      title={modalData ? "Edit Assginment" : "Create Assignment"}
      onClose={() => handleClose()}
      size="lg"
    >
      <FormCreator
        mode={mode}
        onSubmit={(e) => handleSubmit(e)}
        onCancel={handleClose}
        formData={formData}
        data={{
          ...modalData,
          ...(modalData?.dueDate && {
            dueDate: moment(modalData.dueDate, DATETIMEFORMAT).toDate(),
          }),
        }}
        optionsData={{
          groups: groups,
          students: students,
        }}
      />
    </ModalContainer>
  );
};

export default AssignmentModal;
const formData = [
  {
    type: "text",
    name: "assignmentTitle",
    label: "Title",
    placeholder: "Assignment Title",
    required: true,
    size: 8,
  },

  {
    type: "dateTime",
    name: "dueDate",
    label: "Due",
    placeholder: "Assignment Due Date",
    required: true,
    size: 4,
  },

  // {
  //   type: "autocomplete",
  //   name: "students",
  //   label: "Students",
  //   placeholder: "Assignment Students",
  //   required: false,
  //   multiple: true,

  //   size: 6,

  //   hasOptions: true,
  //   optionLabelProp: (e) => e.name,
  //   optionValueProp: (e) => e.studentId,
  // },

  {
    type: "richText",
    name: "instructions",
    label: "Instructions",
    placeholder: "Assignment Students",
    required: false,
    size: 12,
  },
];
