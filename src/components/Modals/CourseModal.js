import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";

import FormCreator from "../Form/FormCreator";
import {
  createCourse,
  editCourse,
  getAllCourses,
} from "../../redux/action/coursesActions";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CreateCourse = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { modalOpen, modalData } = useSelector((state) => state.util);
  const { organizationId, id } = useSelector((state) => state.user);
  const mode = modalData ? "edit" : "add";
  const open = modalOpen === "course";

  const groups = useSelector((state) => state.common.groups);
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (data) => {
    if (mode === "add")
      dispatch(
        createCourse({ ...data, organizationId, userId: id }, () => {
          dispatch(getAllCourses());
          handleClose();
        })
      );
    else {
      dispatch(
        editCourse({ ...data, organizationId, userId: id }, () => {
          dispatch(getAllCourses());
          handleClose();
        })
      );
    }
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
        data={modalData}
        optionsData={{
          groupId: groups,
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
    type: "select",
    name: "groupId",
    label: "Class Name",
    placeholder: "Name of the Class the Course should belong to.",
    required: true,
    size: 12,
    hasOptions: true,
    optionLabelProp: "groupName",
    optionValueProp: "id",
  },
];
