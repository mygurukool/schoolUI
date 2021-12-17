import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";

import FormCreator from "../Form/FormCreator";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CreateCourse = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.util);
  const { groups, students } = useSelector((state) => state.common);
  const open = modalOpen === "courseWork";
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (data) => {
    console.log("handleSubmit", data);
  };

  return (
    <ModalContainer
      open={open}
      title="Create Assginment"
      onClose={() => handleClose()}
      size="lg"
    >
      <FormCreator
        mode={"add"}
        onSubmit={(e) => handleSubmit(e)}
        onCancel={handleClose}
        formData={formData}
        optionsData={{
          groups: groups,
          students: students,
        }}
      />
    </ModalContainer>
  );
};

export default CreateCourse;
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
    type: "dateOnly",
    name: "dueDate",
    label: "Due",
    placeholder: "Assignment Due Date",
    required: true,
    size: 4,
  },

  {
    type: "autocomplete",
    name: "groups",
    label: "For",
    placeholder: "Assignment For",
    required: true,
    size: 6,
    multiple: true,

    hasOptions: true,
    optionLabelProp: (e) => e,
    optionValueProp: (e) => e,
  },

  {
    type: "autocomplete",
    name: "students",
    label: "Students",
    placeholder: "Assignment Students",
    required: true,
    multiple: true,

    size: 6,

    hasOptions: true,
    optionLabelProp: (e) => e.name,
    optionValueProp: (e) => e.studentId,
  },

  {
    type: "richText",
    name: "instructions",
    label: "Instructions",
    placeholder: "Assignment Students",
    required: false,
    size: 12,
  },
];
