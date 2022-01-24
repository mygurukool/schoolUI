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
  const { currentGroup } = useSelector((state) => state.common);
  const groupId = currentGroup?.id || currentGroup?._id;

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
          dispatch(getAllCourses({ groupId }));
          handleClose();
        })
      );
    else {
      dispatch(
        editCourse({ ...data, organizationId, userId: id }, () => {
          dispatch(getAllCourses({ groupId }));
          handleClose();
        })
      );
    }
  };

  return (
    <ModalContainer
      open={open}
      title={modalData ? "Edit Course" : "Create Course"}
      onClose={() => handleClose()}
      size="xs"
      hideButtons
    >
      <FormCreator
        mode={modalData ? "edit" : "add"}
        onSubmit={(e) => handleSubmit(e)}
        onCancel={handleClose}
        formData={modalData ? editformData : createformData}
        data={{
          groupId: [currentGroup?.id || currentGroup?._id],
          ...modalData,
        }}
        optionsData={{
          groupId: groups,
        }}
      />
    </ModalContainer>
  );
};

export default CreateCourse;
const createformData = [
  {
    type: "text",
    name: "courseName",
    label: "Name",
    placeholder: "eg: English, French",
    required: true,
    size: 12,
  },
  {
    type: "multiselect",
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

const editformData = [
  {
    type: "text",
    name: "courseName",
    label: "Name",
    placeholder: "eg: English, French",
    required: true,
    size: 12,
  },
];
