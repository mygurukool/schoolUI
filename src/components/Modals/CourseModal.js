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
  const groups = useSelector((state) => state.common.groups);
  const open = modalOpen === "course";
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (data) => {
    console.log("handleSubmit", data);
  };

  return (
    <ModalContainer
      open={open}
      title="Create Course"
      onClose={() => handleClose()}
      size="xs"
    >
      <FormCreator
        mode={"add"}
        onSubmit={(e) => handleSubmit(e)}
        onCancel={handleClose}
        formData={formData}
        optionsData={{
          className: groups,
        }}
      />
    </ModalContainer>
  );
};

export default CreateCourse;
const formData = [
  {
    type: "text",
    name: "courseName",
    label: "Name",
    placeholder: "eg: English, French",
    required: true,
    size: 12,
  },
  {
    type: "autocomplete",
    name: "className",
    label: "Class Name",
    placeholder: "Name of the Class the Course should belong to.",
    required: true,
    size: 12,
    hasOptions: true,
    optionLabelProp: (e) => e,
    optionValueProp: (e) => e,
  },
];
