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
import useLanguages from "../../hooks/useLanguage";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CreateCourse = () => {
  const translate = useLanguages();
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

  const createformData = [
    {
      type: "text",
      name: "courseName",
      label: translate("NAME"),
      placeholder: translate("NAME_PLACEHOLDER"),
      required: true,
      size: 12,
    },
    {
      type: "multiselect",
      name: "groupId",
      label: translate("CLASS_NAME"),
      placeholder: translate("CLASS_NAME_PLACEHOLDER"),
      required: true,
      size: 12,
      hasOptions: true,
      optionLabelProp: "groupName",
      optionValueProp: "_id",
    },
  ];
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
        formData={createformData}
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
